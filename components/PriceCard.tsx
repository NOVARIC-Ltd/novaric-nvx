"use client";
import { useEffect, useState } from "react";

interface PriceData {
  priceUsd: string | null;
  liquidityUsd: string | null;
  volume24hUsd: string | null;
}

export default function PriceCard() {
  const [data, setData] = useState<PriceData>({priceUsd: null, liquidityUsd: null, volume24hUsd: null});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch("/.netlify/functions/getPrice");
        if(r.ok) {
            const d = await r.json();
            setData(d);
        }
      } catch (error) {
        console.error("Failed to fetch price data:", error);
        setData({priceUsd: null, liquidityUsd: null, volume24hUsd: null});
      } finally {
        setLoading(false);
      }
    };
    run();
    const timer = setInterval(run, 30000);
    return () => clearInterval(timer);
  }, []);
  
  const formatCurrency = (value: string | null | undefined) => {
    if (value === null || value === undefined) return "—";
    const numberValue = Number(value);
    return `$${numberValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  
  const formatPrice = (value: string | null | undefined) => {
     if (value === null || value === undefined) return "—";
     return `$${Number(value).toFixed(5)}`;
  }

  return (
    <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50">
      <h3 className="font-semibold mb-2 text-gray-200">NVX / USDC</h3>
      <div className={`text-3xl font-bold transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>{formatPrice(data.priceUsd)}</div>
      <div className="mt-4 space-y-2 text-sm text-gray-300">
          <div className="flex justify-between"><span>Liquidity:</span> <span className="font-mono">{formatCurrency(data.liquidityUsd)}</span></div>
          <div className="flex justify-between"><span>24h Volume:</span> <span className="font-mono">{formatCurrency(data.volume24hUsd)}</span></div>
      </div>
    </div>
  );
}
