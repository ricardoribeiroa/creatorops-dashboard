import { describe, expect, it } from "vitest";
import {
  formatCompactNumber,
  formatCurrency,
  formatDate,
  formatNumber,
} from "@/lib/format";

describe("format", () => {
  it("formats integers with thousands separators", () => {
    expect(formatNumber(6599830)).toBe("6,599,830");
    expect(formatNumber(0)).toBe("0");
  });

  it("formats USD without decimals", () => {
    expect(formatCurrency(345000)).toBe("$345,000");
  });

  it("formats compact numbers", () => {
    expect(formatCompactNumber(1250400)).toBe("1.3M");
    expect(formatCompactNumber(950)).toBe("950");
  });

  it("formats ISO dates independent of time zone", () => {
    expect(formatDate("2026-09-01")).toBe("Sep 1, 2026");
  });
});
