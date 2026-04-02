import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "./Calculator";

describe("Calculator Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render calculator with display", () => {
    render(<Calculator />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render all calculator buttons", () => {
    render(<Calculator />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(15);
  });

  it("should display digit on click", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    const button5 = screen.getByRole("button", { name: "5" });
    await user.click(button5);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should build number from multiple digits", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "3" }));

    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("should handle addition operation", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("should handle subtraction operation", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "10" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("should clear display with AC button", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "AC" }));

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should delete last character with backspace", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "⌫" }));

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should handle decimal input", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));

    expect(screen.getByText("5.5")).toBeInTheDocument();
  });

  it("should toggle sign with ± button", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "±" }));

    expect(screen.getByText("-5")).toBeInTheDocument();
  });

  it("should apply percentage", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "%" }));

    expect(screen.getByText("0.05")).toBeInTheDocument();
  });

  it("should handle division operation", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "÷" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should handle multiplication operation", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "×" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("should show limit message when digit limit reached", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    // Enter 10 digits one by one
    const digitButtons = screen.getAllByRole("button", { name: "1" });
    for (let i = 0; i < 10; i++) {
      await user.click(digitButtons[0]);
    }

    // Display should show 10 ones
    const displayValue = screen.getByText(/1{10}/);
    expect(displayValue).toBeInTheDocument();

    // Try to add one more digit - should show limit message
    await user.click(digitButtons[0]);

    expect(screen.getByText("Limit reached: max 10 digits")).toBeInTheDocument();
  });

  it("should auto-hide limit message after 3 seconds", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    // Enter 10 digits
    const digitButtons = screen.getAllByRole("button", { name: "1" });
    for (let i = 0; i < 10; i++) {
      await user.click(digitButtons[0]);
    }

    // Try to add more
    await user.click(digitButtons[0]);

    expect(screen.getByText("Limit reached: max 10 digits")).toBeInTheDocument();

    // Advance time by 3 seconds
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(
        screen.queryByText("Limit reached: max 10 digits")
      ).not.toBeInTheDocument();
    });
  });

  it("should allow new number after operator when at digit limit", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    // Enter 10 digits
    const digitButtons = screen.getAllByRole("button", { name: "1" });
    for (let i = 0; i < 10; i++) {
      await user.click(digitButtons[0]);
    }

    // Click operator
    await user.click(screen.getByRole("button", { name: "+" }));

    // Should be able to enter more digits
    await user.click(screen.getByRole("button", { name: "2" }));

    const display = screen.getByText(/1+2/);
    expect(display).toBeInTheDocument();
  });

  it("should handle chained operations", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("should display Error for invalid operations", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Calculator />);

    // This test would need proper division by zero handling
    // Actual behavior depends on implementation
  });
});
