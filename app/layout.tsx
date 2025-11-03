// FIX: Added missing import for React to resolve "Cannot find namespace 'React'" error.
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "NOVARIC • NVX Dashboard",
  description: "AI-assisted Proof of Liquidity & Token Intelligence"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-white min-h-screen`}>
        <Providers>
          <header className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <Link href="/">
              <h1 className="font-bold text-lg cursor-pointer">NOVARIC • NVX</h1>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:underline">Dashboard</Link>
              <Link href="/proof-of-liquidity" className="hover:underline">Proof of Liquidity</Link>
            </nav>
          </header>
          <main className="px-6 py-8 max-w-5xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
