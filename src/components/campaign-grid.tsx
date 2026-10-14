import { CampaignCard } from "@/components/campaign-card";
import { Card } from "@/components/ui/card";
import type { Campaign } from "@/types/campaign";

type CampaignGridProps = {
  campaigns: readonly Campaign[];
};

export function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <section aria-labelledby="campaigns-heading" className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="campaigns-heading" className="text-lg font-semibold">
          Campaigns
        </h2>
        <p className="text-sm text-muted">
          {campaigns.length} {campaigns.length === 1 ? "campaign" : "campaigns"}
        </p>
      </div>

      {campaigns.length === 0 ? (
        <Card className="text-center text-sm text-muted">
          No campaigns yet. Campaigns added to the data source will appear here.
        </Card>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <CampaignCard campaign={campaign} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
