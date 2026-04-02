import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Display from "./Display";

describe("Display Component", () => {
  it("should render display value", () => {
    render(<Display value="123" />);
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("should format large numbers with spaces", () => {
    render(<Display value="1234567" />);
    expect(screen.getByText("1 234 567")).toBeInTheDocument();
  });

  it("should display formatted decimals", () => {
    render(<Display value="1234567.89" />);
    expect(screen.getByText("1 234 567.89")).toBeInTheDocument();
  });

  it("should display Error state", () => {
    render(<Display value="Error" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should display zero", () => {
    render(<Display value="0" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should have aria-live polite attribute", () => {
    const { container } = render(<Display value="123" />);
    const displayElement = container.querySelector(".calculator-display");
    expect(displayElement).toHaveAttribute("aria-live", "polite");
  });

  it("should update when value prop changes", () => {
    const { rerender } = render(<Display value="5" />);
    expect(screen.getByText("5")).toBeInTheDocument();

    rerender(<Display value="10" />);
    expect(screen.queryByText("5")).not.toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should handle expression display", () => {
    render(<Display value="5+3" />);
    expect(screen.getByText("5+3")).toBeInTheDocument();
  });
});
