import { Card } from "@/components/ui/card";

type KpiCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="text-3xl font-semibold tracking-tight tabular-nums text-fg">
        {value}
      </dd>
      {hint ? <dd className="text-xs text-muted">{hint}</dd> : null}
    </Card>
  );
}
