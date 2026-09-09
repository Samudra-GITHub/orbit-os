import { Mail, Calendar, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

const ACCOUNT_ROWS = [
  { icon: Mail, label: "Email", value: "samudra@orbit.os" },
  { icon: Calendar, label: "Member since", value: "September 2026" },
  { icon: Sparkles, label: "Plan", value: "Orbit Plus" },
];

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Account</h1>
        <p className="mt-1 text-sm text-mist-400">Your Orbit profile.</p>
      </div>

      <Card index={0} variant="elevated" className="rounded-4xl">
        <div className="flex items-center gap-4">
          <Avatar alt="Samudra" fallback="S" size="lg" status="online" />
          <div>
            <p className="font-display text-xl font-semibold text-white">Samudra</p>
            <p className="mt-0.5 text-sm text-mist-400">samudra@orbit.os</p>
          </div>
          <Badge variant="accent" className="ml-auto">
            Orbit Plus
          </Badge>
        </div>
      </Card>

      <Card index={1} variant="widget" className="rounded-4xl">
        <div className="flex flex-col gap-1">
          {ACCOUNT_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center gap-3 py-3 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
            >
              <row.icon className="h-4 w-4 shrink-0 text-mist-400" strokeWidth={1.75} />
              <span className="text-sm text-mist-300">{row.label}</span>
              <span className="ml-auto text-sm text-white">{row.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
