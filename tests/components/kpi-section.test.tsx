import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KpiSection } from "@/components/kpi-section";

describe("KpiSection", () => {
  it("renders the four KPIs in order with formatted values", () => {
    render(
      <KpiSection
        kpis={{
          totalCampaigns: 8,
          activeCampaigns: 2,
          totalViews: 1234567,
          totalBudget: 98765,
        }}
      />,
    );

    const labels = screen.getAllByRole("term").map((el) => el.textContent);
    expect(labels).toEqual([
      "Total Campaigns",
      "Active Campaigns",
      "Total Views",
      "Total Budget",
    ]);
    expect(screen.getByText("1,234,567")).toBeInTheDocument();
    expect(screen.getByText("$98,765")).toBeInTheDocument();
    expect(screen.getByText("25% of all campaigns")).toBeInTheDocument();
  });

  it("does not divide by zero when there are no campaigns", () => {
    render(
      <KpiSection
        kpis={{ totalCampaigns: 0, activeCampaigns: 0, totalViews: 0, totalBudget: 0 }}
      />,
    );
    expect(screen.getByText("0% of all campaigns")).toBeInTheDocument();
  });
});
