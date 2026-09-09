import { Wallet } from "lucide-react";

/** A light, calm section header above the wallet card — Finance OS
 *  doesn't need its own greeting/AI-orb hero since Dashboard already owns
 *  that; this just orients the page. */
export function FinanceHero() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15">
        <Wallet className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Finance OS</p>
        <h1 className="font-display text-xl font-semibold text-white sm:text-2xl">Your money, at a glance</h1>
      </div>
    </div>
  );
}
