import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0x39E4d2285bC51a12588341213A05E523C928bF46"
    );

    if (!response.ok) {
      throw new Error(`DEX Screener API error: ${response.status}`);
    }

    const data = await response.json();
    const pair = data?.pairs?.[0];

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120"
      },
      body: JSON.stringify({
        token: "NVX",
        chain: pair?.chainId ?? "bsc",
        dex: pair?.dexId ?? "pancakeswap-v3",
        pairAddress: pair?.pairAddress ?? null,
        priceUsd: pair?.priceUsd ?? null,
        liquidityUsd: pair?.liquidity?.usd ?? null,
        volume24hUsd: pair?.volume?.h24 ?? null,
        priceChange24h: pair?.priceChange?.h24 ?? null,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error("NVX price fetch error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "price_fetch_failed", message })
    };
  }
};
