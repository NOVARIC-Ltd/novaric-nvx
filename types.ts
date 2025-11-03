
export interface PriceData {
  priceUsd: number;
  priceHistory: { time: string; price: number }[];
  change24h: number;
}

export interface MarketStats {
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalLiquidity: number;
  holders: number;
}

export interface LiquidityLock {
  id: string;
  pair: string;
  amount: string;
  valueUsd: number;
  unlockDate: string;
  txHash: string;
}

export interface NvxData {
  priceData: PriceData;
  marketStats: MarketStats;
}
