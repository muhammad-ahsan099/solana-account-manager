// tests/integration/Integration.test.ts

import { SolanaAccountManager } from '../../services/SolanaAccountManager';
import { mockTokenData } from '../../data/mockTokenData';

describe('Integration Tests', () => {
  let manager: SolanaAccountManager;

  beforeAll(() => {
    manager = new SolanaAccountManager();
  });

  it('should fetch and compare balances between two accounts', async () => {
    const publicKey1 = 'mock-public-key-1';
    const publicKey2 = 'mock-public-key-2';

    const comparisonResult = await manager.compareBalances(publicKey1, publicKey2);

    // Safely access mockTokenData and provide default values if undefined
    const token1Balance = mockTokenData[publicKey1]?.[1]?.balance || 0;
    const token2Balance = mockTokenData[publicKey2]?.[0]?.balance || 0;

    const expectedCommonToken = {
      name: 'TokenB',
      balance: token1Balance + token2Balance,
    };

    expect(comparisonResult.account1Only).toEqual([]);
    expect(comparisonResult.account2Only).toEqual([]);
    expect(comparisonResult.commonTokens).toEqual([expectedCommonToken]);
  });
});
