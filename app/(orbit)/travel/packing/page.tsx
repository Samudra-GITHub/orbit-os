import { PackingChecklist } from "@/components/travel/PackingChecklist";

export default function TravelPackingPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Packing list</h1>
        <p className="mt-1 text-sm text-mist-400">Check items off, or add your own — everything&apos;s saved as you go.</p>
      </div>

      <PackingChecklist />
    </div>
  );
}
