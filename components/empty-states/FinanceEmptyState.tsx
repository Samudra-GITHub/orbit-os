import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

/** For a month with no tracked spending yet. Not currently reachable — the
 *  finance mock data always has three categories — but ready for when
 *  spending is tracked per-period against real transactions. */
export function FinanceEmptyState() {
  return (
    <EmptyState
      icon={Wallet}
      title="No spending tracked yet"
      description="Once transactions come in, your budget breakdown will show up here."
    />
  );
}
