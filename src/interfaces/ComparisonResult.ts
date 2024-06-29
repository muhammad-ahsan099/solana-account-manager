import { Token } from './Token';

export interface ComparisonResult {
  account1Only: Token[];
  account2Only: Token[];
  commonTokens: Token[];
}
