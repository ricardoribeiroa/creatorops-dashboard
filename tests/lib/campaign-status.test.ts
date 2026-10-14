import { describe, expect, it } from "vitest";
import { STATUS_META } from "@/lib/campaign-status";
import { CAMPAIGN_STATUSES } from "@/types/campaign";

describe("STATUS_META", () => {
  it("defines a label and token-based classes for every status", () => {
    for (const status of CAMPAIGN_STATUSES) {
      const meta = STATUS_META[status];
      expect(meta.label).not.toBe("");
      expect(meta.badgeClassName).toContain(`bg-status-${status}-bg`);
      expect(meta.badgeClassName).toContain(`text-status-${status}-fg`);
      expect(meta.dotClassName).toBe(`bg-status-${status}-dot`);
    }
  });

  it("uses a distinct color for every status", () => {
    const classes = CAMPAIGN_STATUSES.map((s) => STATUS_META[s].badgeClassName);
    expect(new Set(classes).size).toBe(CAMPAIGN_STATUSES.length);
  });
});
