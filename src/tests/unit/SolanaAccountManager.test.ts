// tests/unit/SolanaAccountManager.test.ts

import { SolanaAccountManager } from '../../services/SolanaAccountManager';
import { mockTokenData } from '../../data/mockTokenData';

describe('SolanaAccountManager', () => {
  let manager: SolanaAccountManager;

  beforeEach(() => {
    manager = new SolanaAccountManager();
  });

  describe('fetchTokens', () => {
    it('should fetch tokens for a given public key', async () => {
      const publicKey = 'mock-public-key-1';
      const tokens = await manager.fetchTokens(publicKey);
      // Adjust to handle cases where tokens might be undefined
      expect(tokens).toEqual(expect.arrayContaining(mockTokenData[publicKey] || []));
    });

    it('should return an empty array for unknown public key', async () => {
      const publicKey = 'unknown-public-key';
      const tokens = await manager.fetchTokens(publicKey);
      expect(tokens).toEqual([]);
    });
  });

  describe('compareBalances', () => {
    it('should compare balances between two accounts', async () => {
      const account1 = 'mock-public-key-1';
      const account2 = 'mock-public-key-2';
      const comparisonResult = await manager.compareBalances(account1, account2);

      // Safely access mockTokenData and provide default values if undefined
      const token1Balance = mockTokenData[account1]?.[1]?.balance || 0;
      const token2Balance = mockTokenData[account2]?.[0]?.balance || 0;

      const expectedCommonToken = {
        name: 'TokenB',
        balance: token1Balance + token2Balance,
      };

      expect(comparisonResult.account1Only).toEqual([]);
      expect(comparisonResult.account2Only).toEqual([]);
      expect(comparisonResult.commonTokens).toEqual([expectedCommonToken]);
    });
  });
});
