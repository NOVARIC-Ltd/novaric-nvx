export default function TradePanel() {
  return (
    <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-2 text-gray-200">Trade NVX (Official)</h3>
        <p className="text-sm text-gray-300">All trades from our UI route to the official NVX/USDC pair on PancakeSwap to ensure deep liquidity.</p>
      </div>
      <a
        href="https://pancakeswap.finance/swap?outputCurrency=0x39E4d2285bC51a12588341213A05E523C928bF46"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-md transition-colors text-center"
      >
        Open PancakeSwap
      </a>
    </div>
  );
}
