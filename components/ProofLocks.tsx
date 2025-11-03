"use client";
import { useEffect, useState } from "react";

type Lock = { id: number; unlock: string; link: string };

export default function ProofLocks() {
  const [locks, setLocks] = useState<Lock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/getLocks")
      .then(r => r.json())
      .then(d => {
        setLocks(d.locks || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch locks", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400">Loading lock data...</div>;
  }
  
  if (locks.length === 0) {
    return <div className="text-center text-gray-400">No lock data available.</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {locks.map(l => (
        <a key={l.id} href={l.link} target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-800 rounded-2xl hover:border-primary transition-colors bg-gray-900/50">
          <div className="font-semibold text-white">UNCX Lock NFT #{l.id}</div>
          <div className="text-sm text-gray-300 mt-1">Unlocks: {new Date(l.unlock).toUTCString()}</div>
          <div className="text-xs text-primary mt-2 font-semibold underline">View on BscScan →</div>
        </a>
      ))}
    </div>
  );
}
