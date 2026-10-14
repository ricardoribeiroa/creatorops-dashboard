import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CampaignGrid } from "@/components/campaign-grid";
import { makeCampaign } from "../fixtures";

describe("CampaignGrid", () => {
  it("renders one list item per campaign", () => {
    render(
      <CampaignGrid
        campaigns={[
          makeCampaign({ id: "a", title: "Alpha" }),
          makeCampaign({ id: "b", title: "Beta" }),
        ]}
      />,
    );
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("2 campaigns")).toBeInTheDocument();
  });

  it("shows an empty state when there are no campaigns", () => {
    render(<CampaignGrid campaigns={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText(/No campaigns yet/)).toBeInTheDocument();
  });
});
