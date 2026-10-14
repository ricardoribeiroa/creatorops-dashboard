import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardPage from "@/app/page";

type RawCampaign = { status: string; views: number; budget: number };

// Read the JSON straight from disk and compute expectations by hand, so this
// test does not depend on getCampaigns() or computeKpis().
const raw: RawCampaign[] = JSON.parse(
  readFileSync(path.join(process.cwd(), "src/data/campaigns.json"), "utf8"),
);

const expected = {
  total: raw.length,
  active: raw.filter((c) => c.status === "active").length,
  views: raw.reduce((sum, c) => sum + c.views, 0),
  budget: raw.reduce((sum, c) => sum + c.budget, 0),
};

function kpiValue(label: string): string | null {
  const term = screen
    .getAllByRole("term")
    .find((el) => el.textContent === label);
  return term?.nextElementSibling?.textContent ?? null;
}

describe("Dashboard page", () => {
  it("shows KPIs that match the underlying campaign data", () => {
    render(<DashboardPage />);

    expect(kpiValue("Total Campaigns")).toBe(expected.total.toLocaleString("en-US"));
    expect(kpiValue("Active Campaigns")).toBe(expected.active.toLocaleString("en-US"));
    expect(kpiValue("Total Views")).toBe(expected.views.toLocaleString("en-US"));
    expect(kpiValue("Total Budget")).toBe(`$${expected.budget.toLocaleString("en-US")}`);
  });

  it("matches the documented reference values for the v0.1 dataset", () => {
    expect(expected).toEqual({ total: 12, active: 4, views: 6599830, budget: 345000 });
  });

  it("renders the KPI section before a card for every campaign", () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Campaign dashboard");
    const kpiHeading = screen.getByRole("heading", { level: 2, name: "Key metrics" });
    const campaignsHeading = screen.getByRole("heading", { level: 2, name: "Campaigns" });
    expect(
      kpiHeading.compareDocumentPosition(campaignsHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getAllByRole("article")).toHaveLength(expected.total);
  });
});
