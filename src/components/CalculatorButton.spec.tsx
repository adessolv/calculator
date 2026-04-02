import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalculatorButton from "./CalculatorButton";

describe("CalculatorButton Component", () => {
  it("should render button with label", () => {
    render(<CalculatorButton size="wide" label="5" variant="digit" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <CalculatorButton size="wide" label="5" variant="digit" onClick={handleClick} />
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("should apply digit variant class", () => {
    const { container } = render(
      <CalculatorButton size="wide" label="5" variant="digit" onClick={() => {}} />
    );
    const button = container.querySelector(".calculator-button");
    expect(button).toHaveClass("digit");
  });

  it("should apply operator variant class", () => {
    const { container } = render(
      <CalculatorButton size="wide" label="+" variant="operator" onClick={() => {}} />
    );
    const button = container.querySelector(".calculator-button");
    expect(button).toHaveClass("operator");
  });

  it("should apply secondary variant class", () => {
    const { container } = render(
      <CalculatorButton size="wide" label="AC" variant="secondary" onClick={() => {}} />
    );
    const button = container.querySelector(".calculator-button");
    expect(button).toHaveClass("secondary");
  });

  it("should apply equal variant class", () => {
    const { container } = render(
      <CalculatorButton size="wide" label="=" variant="equal" onClick={() => {}} />
    );
    const button = container.querySelector(".calculator-button");
    expect(button).toHaveClass("equal");
  });

  it("should render with size class when provided", () => {
    const { container } = render(
      <CalculatorButton label="0" variant="digit" size="wide" onClick={() => {}} />
    );
    const button = container.querySelector(".calculator-button");
    expect(button).toHaveClass("wide");
  });

  it("should be a button element", () => {
    const { container } = render(
      <CalculatorButton size="wide" label="5" variant="digit" onClick={() => {}} />
    );
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should render special characters", () => {
    render(<CalculatorButton size="wide" label="÷" variant="operator" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "÷" })).toBeInTheDocument();
  });

  it("should render backspace symbol", () => {
    render(<CalculatorButton size="wide" label="⌫" variant="secondary" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "⌫" })).toBeInTheDocument();
  });
});
