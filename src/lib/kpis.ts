import type { Campaign, CampaignKpis } from "@/types/campaign";

export function computeKpis(campaigns: readonly Campaign[]): CampaignKpis {
  return campaigns.reduce<CampaignKpis>(
    (kpis, campaign) => ({
      totalCampaigns: kpis.totalCampaigns + 1,
      activeCampaigns:
        kpis.activeCampaigns + (campaign.status === "active" ? 1 : 0),
      totalViews: kpis.totalViews + campaign.views,
      totalBudget: kpis.totalBudget + campaign.budget,
    }),
    { totalCampaigns: 0, activeCampaigns: 0, totalViews: 0, totalBudget: 0 },
  );
}
