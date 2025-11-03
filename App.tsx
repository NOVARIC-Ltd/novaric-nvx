import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProofOfLiquidity from './components/ProofOfLiquidity';
import { WalletProvider } from './hooks/useWallet';

// FIX: This file was empty, causing an import error in `components/Header.tsx`.
// The content below sets up a basic React app structure to make the components work together
// and exports the `Page` enum to resolve the error.
export enum Page {
  Dashboard,
  ProofOfLiquidity,
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);

  const renderPage = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.ProofOfLiquidity:
        return <ProofOfLiquidity />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <WalletProvider>
      {/* Assuming Tailwind CSS is set up globally. The Next.js app part has globals.css. */}
      <div className="bg-dark text-white min-h-screen">
        <Header activePage={activePage} setActivePage={setActivePage} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </main>
      </div>
    </WalletProvider>
  );
};

export default App;
