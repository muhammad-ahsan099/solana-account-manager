import { Token } from '../interfaces/Token';

export const mockTokenData: { [key: string]: Token[] } = {
  'your-public-key-1': [
    { name: 'TokenA', balance: 100 },
    { name: 'TokenB', balance: 200 }
  ],
  'your-public-key-2': [
    { name: 'TokenB', balance: 150 },
    { name: 'TokenC', balance: 300 }
  ]
};
