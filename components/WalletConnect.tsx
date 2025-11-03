"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { WalletIcon } from './icons/Icons';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-white">{formatAddress(address)}</span>
        <button
          onClick={() => disconnect()}
          className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
    >
      <WalletIcon className="h-5 w-5 mr-2" />
      Connect Wallet
    </button>
  );
};

export default WalletConnect;
