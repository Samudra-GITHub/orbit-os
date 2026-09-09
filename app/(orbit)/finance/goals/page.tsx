import { SavingsGoalCard } from "@/components/finance/SavingsGoalCard";
import { SAVINGS_GOALS } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";

export default function FinanceGoalsPage() {
  const totalSaved = SAVINGS_GOALS.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = SAVINGS_GOALS.reduce((sum, g) => sum + g.target, 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Savings goals</h1>
        <p className="mt-1 text-sm text-mist-400">
          {formatINR(totalSaved)} saved toward {formatINR(totalTarget)} across {SAVINGS_GOALS.length} goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SAVINGS_GOALS.map((goal, i) => (
          <SavingsGoalCard key={goal.id} goal={goal} index={i} />
        ))}
      </div>
    </div>
  );
}
