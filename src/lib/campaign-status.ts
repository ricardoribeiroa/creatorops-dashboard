import type { CampaignStatus } from "@/types/campaign";

type StatusMeta = {
  label: string;
  /** Tailwind classes built from design-system status tokens. */
  badgeClassName: string;
  dotClassName: string;
};

// Single source of truth for status labels and colors (see docs/DESIGN_SYSTEM.md).
// Class names are written out in full so Tailwind can detect them.
export const STATUS_META: Record<CampaignStatus, StatusMeta> = {
  active: {
    label: "Active",
    badgeClassName: "bg-status-active-bg text-status-active-fg",
    dotClassName: "bg-status-active-dot",
  },
  scheduled: {
    label: "Scheduled",
    badgeClassName: "bg-status-scheduled-bg text-status-scheduled-fg",
    dotClassName: "bg-status-scheduled-dot",
  },
  paused: {
    label: "Paused",
    badgeClassName: "bg-status-paused-bg text-status-paused-fg",
    dotClassName: "bg-status-paused-dot",
  },
  completed: {
    label: "Completed",
    badgeClassName: "bg-status-completed-bg text-status-completed-fg",
    dotClassName: "bg-status-completed-dot",
  },
  draft: {
    label: "Draft",
    badgeClassName: "bg-status-draft-bg text-status-draft-fg",
    dotClassName: "bg-status-draft-dot",
  },
};
