import { describe, expect, it } from "vitest";
import { computeKpis } from "@/lib/kpis";
import { makeCampaign } from "../fixtures";

describe("computeKpis", () => {
  it("returns zeros for an empty list", () => {
    expect(computeKpis([])).toEqual({
      totalCampaigns: 0,
      activeCampaigns: 0,
      totalViews: 0,
      totalBudget: 0,
    });
  });

  it("counts only active campaigns as active and sums views and budget across all", () => {
    const campaigns = [
      makeCampaign({ id: "a", status: "active", views: 100, budget: 10 }),
      makeCampaign({ id: "b", status: "paused", views: 200, budget: 20 }),
      makeCampaign({ id: "c", status: "active", views: 300, budget: 30 }),
      makeCampaign({ id: "d", status: "completed", views: 0, budget: 40 }),
      makeCampaign({ id: "e", status: "draft", views: 0, budget: 0 }),
    ];

    expect(computeKpis(campaigns)).toEqual({
      totalCampaigns: 5,
      activeCampaigns: 2,
      totalViews: 600,
      totalBudget: 100,
    });
  });
});
