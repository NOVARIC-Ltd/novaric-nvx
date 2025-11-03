import ProofLocks from "@/components/ProofLocks";

export default function ProofPage() {
  return (
    <section className="grid gap-4">
      <h2 className="text-2xl font-semibold">Proof of Liquidity</h2>
      <p className="text-gray-300">NVX liquidity positions are time-locked through UNCX. View the NFTs and on-chain records below.</p>
      <ProofLocks />
    </section>
  );
}
