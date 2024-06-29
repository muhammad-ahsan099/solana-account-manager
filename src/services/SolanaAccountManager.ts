import { Token } from '../interfaces/Token';
import { ComparisonResult } from '../interfaces/ComparisonResult';
import { mockTokenData } from '../data/mockTokenData';

export class SolanaAccountManager {
  async fetchTokens(publicKey: string): Promise<Token[]> {
    const tokens = mockTokenData[publicKey] || [];
    return new Promise(resolve => setTimeout(() => resolve(tokens), 1000)); // Simulate async call
  }

  async compareBalances(account1: string, account2: string): Promise<ComparisonResult> {
    const [tokens1, tokens2] = await Promise.all([
      this.fetchTokens(account1),
      this.fetchTokens(account2)
    ]);

    const account1Only: Token[] = [];
    const account2Only: Token[] = [];
    const commonTokens: Token[] = [];

    const tokens2Map = new Map<string, Token>(tokens2.map(token => [token.name, token]));

    tokens1.forEach(token1 => {
      const token2 = tokens2Map.get(token1.name);
      if (token2) {
        commonTokens.push({ name: token1.name, balance: token1.balance + token2.balance });
        tokens2Map.delete(token1.name);
      } else {
        account1Only.push(token1);
      }
    });

    tokens2Map.forEach(token2 => account2Only.push(token2));

    return { account1Only, account2Only, commonTokens };
  }
}
