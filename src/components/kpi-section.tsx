import { KpiCard } from "@/components/kpi-card";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { CampaignKpis } from "@/types/campaign";

type KpiSectionProps = {
  kpis: CampaignKpis;
};

export function KpiSection({ kpis }: KpiSectionProps) {
  const activeShare =
    kpis.totalCampaigns === 0
      ? 0
      : Math.round((kpis.activeCampaigns / kpis.totalCampaigns) * 100);

  return (
    <section aria-labelledby="kpi-heading" className="flex flex-col gap-4">
      <h2 id="kpi-heading" className="text-lg font-semibold">
        Key metrics
      </h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Campaigns"
          value={formatNumber(kpis.totalCampaigns)}
          hint="All statuses"
        />
        <KpiCard
          label="Active Campaigns"
          value={formatNumber(kpis.activeCampaigns)}
          hint={`${activeShare}% of all campaigns`}
        />
        <KpiCard
          label="Total Views"
          value={formatNumber(kpis.totalViews)}
          hint="Across all campaigns"
        />
        <KpiCard
          label="Total Budget"
          value={formatCurrency(kpis.totalBudget)}
          hint="Allocated, USD"
        />
      </dl>
    </section>
  );
}
