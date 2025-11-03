"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletConnect from './WalletConnect';

const Header: React.FC = () => {
  const pathname = usePathname();

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        pathname === href
          ? 'bg-gray-800 text-cyan-400'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-black bg-opacity-30 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <img src="https://novaric.co/wp-content/uploads/2025/10/NOVARIC_Sh-A_Logo_Illustrator_Final-Version_27102025_320x320.png" alt="NOVARIC Logo" className="h-9 w-9" />
              <span className="font-bold text-xl text-white">NOVARIC</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink href="/">Dashboard</NavLink>
              <NavLink href="/proof-of-liquidity">Proof of Liquidity</NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
        <div className="md:hidden py-2">
            <nav className="flex items-center justify-center space-x-4">
              <NavLink href="/">Dashboard</NavLink>
              <NavLink href="/proof-of-liquidity">Proof of Liquidity</NavLink>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
