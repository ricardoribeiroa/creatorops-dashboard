import { describe, expect, it } from "vitest";
import { getCampaigns, parseCampaigns } from "@/lib/campaigns";
import { makeCampaign } from "../fixtures";

describe("parseCampaigns", () => {
  it("accepts valid campaigns", () => {
    const input = [makeCampaign({ id: "a" }), makeCampaign({ id: "b" })];
    expect(parseCampaigns(input)).toEqual(input);
  });

  it("rejects non-array input", () => {
    expect(() => parseCampaigns({})).toThrow("must be an array");
  });

  it.each([
    [{ status: "archived" }, 'unknown status "archived"'],
    [{ platform: "Myspace" }, 'unknown platform "Myspace"'],
    [{ budget: -1 }, '"budget" must be a non-negative integer'],
    [{ views: 1.5 }, '"views" must be a non-negative integer'],
    [{ title: "  " }, '"title" must be a non-empty string'],
    [{ startDate: "01/02/2026" }, '"startDate" must be an ISO date'],
    [
      { startDate: "2026-05-01", endDate: "2026-04-01" },
      '"endDate" is before "startDate"',
    ],
  ])("rejects invalid field %o", (override, message) => {
    const input = [{ ...makeCampaign(), ...override }];
    expect(() => parseCampaigns(input)).toThrow(message);
  });

  it("rejects duplicate ids", () => {
    const input = [makeCampaign({ id: "x" }), makeCampaign({ id: "x" })];
    expect(() => parseCampaigns(input)).toThrow(
      'Invalid campaign at index 1: duplicate id "x"',
    );
  });
});

describe("getCampaigns", () => {
  it("loads and validates the bundled JSON data", () => {
    const campaigns = getCampaigns();
    expect(campaigns.length).toBeGreaterThan(0);
  });

  it("includes at least one campaign for every status", () => {
    const statuses = new Set(getCampaigns().map((c) => c.status));
    expect([...statuses].sort()).toEqual(
      ["active", "completed", "draft", "paused", "scheduled"],
    );
  });
});
