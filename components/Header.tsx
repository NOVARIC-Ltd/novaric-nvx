
import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { Page } from '../App';
import { WalletIcon, NovaIcon } from './icons/Icons';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();

  const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activePage === page
          ? 'bg-gray-800 text-cyan-400'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="bg-black bg-opacity-30 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <NovaIcon className="h-8 w-8 text-cyan-500" />
              <span className="font-bold text-xl text-white">NOVARIC</span>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink page={Page.Dashboard}>Dashboard</NavLink>
              <NavLink page={Page.ProofOfLiquidity}>Proof of Liquidity</NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={isConnected ? disconnectWallet : connectWallet}
              className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              <WalletIcon className="h-5 w-5" />
              <span>
                {isConnected && address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>
        <div className="md:hidden py-2">
            <nav className="flex items-center justify-center space-x-4">
              <NavLink page={Page.Dashboard}>Dashboard</NavLink>
              <NavLink page={Page.ProofOfLiquidity}>Proof of Liquidity</NavLink>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
