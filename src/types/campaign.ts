export const CAMPAIGN_STATUSES = [
  "draft",
  "scheduled",
  "active",
  "paused",
  "completed",
] as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const PLATFORMS = [
  "YouTube",
  "Instagram",
  "TikTok",
  "Twitch",
  "X",
] as const;

export type Platform = (typeof PLATFORMS)[number];

export type Campaign = {
  id: string;
  title: string;
  description: string;
  status: CampaignStatus;
  creator: string;
  platform: Platform;
  /** Allocated budget in whole US dollars. */
  budget: number;
  views: number;
  /** ISO date, YYYY-MM-DD. */
  startDate: string;
  /** ISO date, YYYY-MM-DD. */
  endDate: string;
};

export type CampaignKpis = {
  totalCampaigns: number;
  activeCampaigns: number;
  totalViews: number;
  totalBudget: number;
};
