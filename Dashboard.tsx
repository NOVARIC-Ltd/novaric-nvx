"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { NvxData, MarketStats, PriceData } from '@/types';
import Card from './Card';
import Spinner from './Spinner';
import { ArrowUpIcon, ArrowDownIcon, InfoIcon, RefreshIcon, AiIcon } from './icons/Icons';

interface DashboardData extends NvxData {
    aiAnalysis: string;
}

const fetchDashboardData = async (): Promise<DashboardData> => {
    const res = await fetch('/api/dashboard-data');
    if (!res.ok) {
        throw new Error('Failed to fetch dashboard data');
    }
    return res.json();
}


const Dashboard: React.FC = () => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery<DashboardData>({
      queryKey: ['dashboardData'],
      queryFn: fetchDashboardData,
      refetchOnWindowFocus: false,
  });

  const handleRefreshAnalysis = () => {
      refetch();
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-center text-red-500">{error?.message || 'No data available.'}</div>;
  }
  
  const { priceData, marketStats, aiAnalysis } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PriceChartCard priceData={priceData} />
        <AiAnalysisCard analysis={aiAnalysis} loading={isRefetching} onRefresh={handleRefreshAnalysis} />
      </div>

      <div className="lg:col-span-1 space-y-6">
        <MarketStatsCard stats={marketStats} />
      </div>
    </div>
  );
};

// ... Sub-components remain the same but are now part of this client component file ...

const PriceChartCard: React.FC<{ priceData: PriceData }> = ({ priceData }) => {
    const isPositiveChange = priceData.change24h >= 0;
    return (
        <Card title="NVX Price" titleIcon={<InfoIcon />}>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                    <p className="text-4xl font-bold text-white">${priceData.priceUsd.toFixed(6)}</p>
                </div>
                <div className={`flex items-center text-lg font-semibold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositiveChange ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    <span>{priceData.change24h.toFixed(2)}% (24h)</span>
                </div>
            </div>
            <div className="h-64 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData.priceHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                {/* FIX: Wrapped string literal SVG attribute values in curly braces to fix TS error */}
                                <stop offset="5%" stopColor={"#06b6d4"} stopOpacity={0.8}/>
                                {/* FIX: Wrapped string literal SVG attribute values in curly braces to fix TS error */}
                                <stop offset="95%" stopColor={"#06b6d4"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a384c" />
                        <XAxis dataKey="time" stroke="#8892b0" fontSize={12} />
                        <YAxis stroke="#8892b0" fontSize={12} domain={['dataMin', 'dataMax']} tickFormatter={(tick) => `$${tick.toFixed(6)}`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} labelStyle={{ color: '#d1d5db' }}/>
                        <Area type="monotone" dataKey="price" stroke="#06b6d4" fill="url(#priceGradient)" fillOpacity={1} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

const MarketStatsCard: React.FC<{ stats: MarketStats }> = ({ stats }) => {
    const formatNumber = (num: number) => {
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
        return `$${num.toFixed(2)}`;
    };
    
    const statsItems = [
        { label: "Market Cap", value: formatNumber(stats.marketCap) },
        { label: "Volume (24h)", value: formatNumber(stats.volume24h) },
        { label: "Total Liquidity", value: formatNumber(stats.totalLiquidity) },
        { label: "Circulating Supply", value: stats.circulatingSupply.toLocaleString() },
        { label: "Holders", value: stats.holders.toLocaleString() },
    ];

    return (
        <Card title="Market Statistics" titleIcon={<InfoIcon />}>
            <div className="space-y-4">
                {statsItems.map(item => (
                    <div key={item.label} className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="font-medium text-white">{item.value}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const AiAnalysisCard: React.FC<{ analysis: string | null; loading: boolean; onRefresh: () => void; }> = ({ analysis, loading, onRefresh }) => {
    return (
        <Card 
            title="Gemini AI Analysis" 
            titleIcon={<AiIcon />}
            headerAction={
                <button onClick={onRefresh} disabled={loading} className="p-1 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Refresh analysis">
                    <RefreshIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            }
        >
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 min-h-[100px]">
                {loading ? <Spinner /> : 
                    analysis?.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
                }
            </div>
        </Card>
    );
};

export default Dashboard;
