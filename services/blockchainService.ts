
import { NvxData, LiquidityLock } from '../types';

// Mock function to simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Mock Data Generators
const generatePriceHistory = () => {
  const history = [];
  let price = 0.00018;
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    price *= (1 + (Math.random() - 0.48) / 20); // small random fluctuation
    history.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(8)),
    });
  }
  return history;
};

const mockPriceHistory = generatePriceHistory();

const mockNvxData: NvxData = {
  priceData: {
    priceUsd: mockPriceHistory[mockPriceHistory.length - 1].price,
    priceHistory: mockPriceHistory,
    change24h: (mockPriceHistory[mockPriceHistory.length-1].price / mockPriceHistory[mockPriceHistory.length-2].price -1) * 100,
  },
  marketStats: {
    marketCap: 180000,
    volume24h: 25000,
    circulatingSupply: 1000000000,
    totalLiquidity: 150000,
    holders: 1234,
  },
};

const mockLiquidityLocks: LiquidityLock[] = [
  {
    id: '1',
    pair: 'NVX/WBNB',
    amount: '1,200,000 NVX',
    valueUsd: 110000,
    unlockDate: 'Oct 25, 2025',
    txHash: '0x123...abc',
  },
  {
    id: '2',
    pair: 'NVX/USDT',
    amount: '300,000 NVX',
    valueUsd: 40000,
    unlockDate: 'Jan 15, 2025',
    txHash: '0x456...def',
  },
];

export const fetchNvxData = async (): Promise<NvxData> => {
  console.log('Fetching mock NVX data...');
  await delay(1000);
  return mockNvxData;
};

export const fetchLiquidityLocks = async (): Promise<LiquidityLock[]> => {
  console.log('Fetching mock liquidity lock data...');
  await delay(800);
  return mockLiquidityLocks;
};
