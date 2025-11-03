
import React, { useState, useEffect, useCallback } from 'react';
import { fetchLiquidityLocks } from '../services/blockchainService';
import { analyzeLiquidityData } from '../services/geminiService';
import { LiquidityLock } from '../types';
import Card from './Card';
import Spinner from './Spinner';
import { AiIcon, LinkIcon, LockIcon } from './icons/Icons';

const ProofOfLiquidity: React.FC = () => {
  const [locks, setLocks] = useState<LiquidityLock[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const lockData = await fetchLiquidityLocks();
      setLocks(lockData);
      const analysis = await analyzeLiquidityData(lockData);
      setAiAnalysis(analysis);
    } catch (err) {
      setError('Failed to fetch liquidity lock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  
  const totalLockedValue = locks.reduce((sum, lock) => sum + lock.valueUsd, 0);

  return (
    <div className="space-y-8">
      <Card title="AI Liquidity Summary" titleIcon={<AiIcon />}>
        <div className="text-sm text-gray-300 leading-relaxed space-y-3">
          {aiAnalysis ? (
            aiAnalysis.split('\n').map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <div className="flex justify-center items-center h-24"><Spinner /></div>
          )}
        </div>
      </Card>
      
      <Card>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LockIcon />
                <span>UNCX Liquidity Locks</span>
            </h2>
            <div className="text-right mt-2 md:mt-0">
                <p className="text-gray-400 text-sm">Total Locked Value</p>
                <p className="text-2xl font-bold text-cyan-400">${totalLockedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pair</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount Locked</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value (USD)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Unlock Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Proof</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 bg-opacity-50 divide-y divide-gray-800">
              {locks.map((lock) => (
                <tr key={lock.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{lock.pair}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{lock.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${lock.valueUsd.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{lock.unlockDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a 
                      href={`https://bscscan.com/tx/${lock.txHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <LinkIcon />
                      <span>BscScan</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProofOfLiquidity;
