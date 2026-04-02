import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("should render the app", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should render the calculator component", () => {
    render(<App />);
    const calculator = screen.getByLabelText("Calculator");
    expect(calculator).toBeInTheDocument();
  });

  it("should display initial value of 0", () => {
    render(<App />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should have calculator shell wrapper", () => {
    const { container } = render(<App />);
    const shell = container.querySelector(".calculator-shell");
    expect(shell).toBeInTheDocument();
  });

  it("should have app shell styling", () => {
    const { container } = render(<App />);
    const appShell = container.querySelector(".app-shell");
    expect(appShell).toBeInTheDocument();
  });
});
