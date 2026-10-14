import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CampaignCard } from "@/components/campaign-card";
import { makeCampaign } from "../fixtures";

describe("CampaignCard", () => {
  it("renders title, description, status and key details", () => {
    render(
      <CampaignCard
        campaign={makeCampaign({
          title: "Summer Glow Launch",
          description: "Skincare launch.",
          status: "scheduled",
          budget: 48000,
          views: 1250400,
          endDate: "2026-11-15",
        })}
      />,
    );

    expect(
      screen.getByRole("article", { name: "Summer Glow Launch" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Summer Glow Launch" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Skincare launch.")).toBeInTheDocument();
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
    expect(screen.getByText("$48,000")).toBeInTheDocument();
    expect(screen.getByText("1.3M")).toBeInTheDocument();
    expect(screen.getByText("Nov 15, 2026")).toBeInTheDocument();
  });
});
