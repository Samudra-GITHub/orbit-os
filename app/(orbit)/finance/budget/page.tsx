import { BudgetPlanner } from "@/components/finance/BudgetPlanner";

export default function FinanceBudgetPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Budget planner</h1>
        <p className="mt-1 text-sm text-mist-400">Drag a category's slider to adjust its monthly budget.</p>
      </div>

      <BudgetPlanner />
    </div>
  );
}
