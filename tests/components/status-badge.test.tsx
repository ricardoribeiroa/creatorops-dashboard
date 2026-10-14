import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "@/components/status-badge";

describe("StatusBadge", () => {
  it("shows the status as text, not only color", () => {
    render(<StatusBadge status="paused" />);
    const badge = screen.getByText("Paused").closest("[data-status]");
    expect(badge).toHaveAttribute("data-status", "paused");
    expect(badge).toHaveTextContent("Status: Paused");
    expect(badge).toHaveClass("bg-status-paused-bg", "text-status-paused-fg");
  });
});
