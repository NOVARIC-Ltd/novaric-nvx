"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="bg-gray-800 px-3 py-1 rounded-md font-mono">{address?.slice(0,6)}…{address?.slice(-4)}</span>
        <button className="text-red-400 hover:underline" onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-md transition-colors" onClick={() => connect({ connector: injected() })}>
      Connect Wallet
    </button>
  );
}
