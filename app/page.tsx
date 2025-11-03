import PriceCard from "@/components/PriceCard";
import TradePanel from "@/components/TradePanel";
import WalletConnect from "@/components/WalletConnect";
import AISummary from "@/components/AISummary";

export default function Page() {
  return (
    <section className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">NVX Dashboard</h2>
        <WalletConnect />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <PriceCard />
        <TradePanel />
      </div>
      <AISummary />
    </section>
  );
}
