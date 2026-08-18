import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "../StatusBadge";

describe("StatusBadge", () => {
  it('renders label "Alive" with emerald status dot', () => {
    const { container } = render(<StatusBadge status="Alive" />);
    expect(screen.getByText("Alive")).toBeInTheDocument();
    const dot = container.querySelector(".bg-status-alive");
    expect(dot).toBeInTheDocument();
  });

  it('renders label "Dead" with rose status dot', () => {
    const { container } = render(<StatusBadge status="Dead" />);
    expect(screen.getByText("Dead")).toBeInTheDocument();
    const dot = container.querySelector(".bg-status-dead");
    expect(dot).toBeInTheDocument();
  });

  it('renders label "unknown" with muted status dot', () => {
    const { container } = render(<StatusBadge status="unknown" />);
    expect(screen.getByText("unknown")).toBeInTheDocument();
    const dot = container.querySelector(".bg-status-unknown");
    expect(dot).toBeInTheDocument();
  });

  it('contains accessible role="status"', () => {
    render(<StatusBadge status="Alive" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Status: Alive");
  });
});
