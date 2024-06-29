import { SolanaAccountManager } from '../services/SolanaAccountManager';

(async () => {
  const manager = new SolanaAccountManager();

  const publicKey1 = 'your-public-key-1';
  const publicKey2 = 'your-public-key-2';

  try {
    const tokens1 = await manager.fetchTokens(publicKey1);
    const tokens2 = await manager.fetchTokens(publicKey2);

    console.log(`Tokens for account ${publicKey1}:`, tokens1);
    console.log(`Tokens for account ${publicKey2}:`, tokens2);

    const comparisonResult = await manager.compareBalances(publicKey1, publicKey2);

    console.log('Tokens unique to account 1:', comparisonResult.account1Only);
    console.log('Tokens unique to account 2:', comparisonResult.account2Only);
    console.log('Common tokens:', comparisonResult.commonTokens);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
