import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import {
  formatCompactNumber,
  formatCurrency,
  formatDate,
} from "@/lib/format";
import type { Campaign } from "@/types/campaign";

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const titleId = `campaign-${campaign.id}-title`;

  return (
    <Card
      as="article"
      aria-labelledby={titleId}
      className="flex h-full flex-col gap-4"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={titleId} className="text-base font-semibold text-fg">
            {campaign.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-muted">
            {campaign.creator} · {campaign.platform}
          </p>
        </div>
        <StatusBadge status={campaign.status} />
      </header>

      <p className="flex-1 text-sm leading-6 text-muted">
        {campaign.description}
      </p>

      <dl className="grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs">
        <div>
          <dt className="text-muted">Budget</dt>
          <dd className="mt-0.5 font-medium tabular-nums text-fg">
            {formatCurrency(campaign.budget)}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Views</dt>
          <dd className="mt-0.5 font-medium tabular-nums text-fg">
            {formatCompactNumber(campaign.views)}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Ends</dt>
          <dd className="mt-0.5 font-medium tabular-nums text-fg">
            <time dateTime={campaign.endDate}>
              {formatDate(campaign.endDate)}
            </time>
          </dd>
        </div>
      </dl>
    </Card>
  );
}
