import type { Campaign } from "@/types/campaign";

export function makeCampaign(overrides: Partial<Campaign> = {}): Campaign {
  return {
    id: "cmp-test",
    title: "Test Campaign",
    description: "A campaign used in tests.",
    status: "active",
    creator: "Test Creator",
    platform: "YouTube",
    budget: 1000,
    views: 5000,
    startDate: "2026-01-01",
    endDate: "2026-02-01",
    ...overrides,
  };
}
