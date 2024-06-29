// tests/helpers/testUtils.ts

import { Token } from '../../interfaces/Token';
import { mockTokenData } from '../../data/mockTokenData';

export function generateMockTokens(publicKey: string): Token[] {
  return mockTokenData[publicKey] || [];
}
