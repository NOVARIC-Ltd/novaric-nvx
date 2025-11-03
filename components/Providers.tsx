"use client";

// FIX: Added missing import for React to resolve "Cannot find namespace 'React'" error.
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { RPC_URL } from "@/lib/config";

const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(RPC_URL),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
