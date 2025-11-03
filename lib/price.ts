export async function getNVXMarketData() {
  const res = await fetch(
    'https://api.dexscreener.com/latest/dex/tokens/0x39E4d2285bC51a12588341213A05E523C928bF46'
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data from DexScreener');
  }
  const data = await res.json();
  const pair = data.pairs?.[0];
  return {
    price: pair?.priceUsd,
    liquidity: pair?.liquidity?.usd,
    volume24h: pair?.volume?.h24,
    priceChange24h: pair?.priceChange?.h24
  };
}
