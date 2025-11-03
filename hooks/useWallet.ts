import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(() => {
    // Simulate wallet connection
    setIsConnected(true);
    setAddress('0xAbCd...1234');
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
  }, []);

  const value = useMemo(() => ({
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
  }), [isConnected, address, connectWallet, disconnectWallet]);

  // Fix: Replaced JSX with React.createElement to resolve parsing errors in a .ts file.
  return React.createElement(WalletContext.Provider, { value: value }, children);
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
