import { STATUS_META } from "@/lib/campaign-status";
import type { CampaignStatus } from "@/types/campaign";

type StatusBadgeProps = {
  status: CampaignStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = STATUS_META[status];
  return (
    <span
      data-status={status}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.badgeClassName}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${meta.dotClassName}`}
      />
      <span>
        <span className="sr-only">Status: </span>
        {meta.label}
      </span>
    </span>
  );
}
