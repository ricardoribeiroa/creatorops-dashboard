import { CampaignGrid } from "@/components/campaign-grid";
import { KpiSection } from "@/components/kpi-section";
import { getCampaigns } from "@/lib/campaigns";
import { computeKpis } from "@/lib/kpis";

export default function DashboardPage() {
  const campaigns = getCampaigns();
  const kpis = computeKpis(campaigns);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-medium text-accent">CreatorOps</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Campaign dashboard
        </h1>
        <p className="text-sm text-muted">
          Performance and status across all creator campaigns.
        </p>
      </header>

      <KpiSection kpis={kpis} />
      <CampaignGrid campaigns={campaigns} />
    </main>
  );
}
