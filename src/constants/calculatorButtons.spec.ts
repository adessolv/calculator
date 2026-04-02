import { describe, it, expect } from "vitest";
import { calculatorButtons } from "./calculatorButtons";

describe("calculatorButtons constants", () => {
  it("should export an array of buttons", () => {
    expect(Array.isArray(calculatorButtons)).toBe(true);
  });

  it("should have 20 buttons total", () => {
    expect(calculatorButtons).toHaveLength(20);
  });

  it("should have unique button ids", () => {
    const ids = calculatorButtons.map((btn) => btn.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have all required properties", () => {
    calculatorButtons.forEach((button) => {
      expect(button).toHaveProperty("id");
      expect(button).toHaveProperty("label");
      expect(button).toHaveProperty("value");
      expect(button).toHaveProperty("variant");
    });
  });

  it("should have valid variants", () => {
    const validVariants = ["digit", "operator", "secondary", "equal"];
    calculatorButtons.forEach((button) => {
      expect(validVariants).toContain(button.variant);
    });
  });

  it("should have operator buttons", () => {
    const operators = calculatorButtons.filter(
      (btn) => btn.variant === "operator"
    );
    expect(operators.length).toBeGreaterThan(0);
  });

  it("should have digit buttons", () => {
    const digits = calculatorButtons.filter((btn) => btn.variant === "digit");
    expect(digits.length).toBeGreaterThan(0);
  });

  it("should have secondary buttons", () => {
    const secondary = calculatorButtons.filter(
      (btn) => btn.variant === "secondary"
    );
    expect(secondary.length).toBeGreaterThan(0);
  });

  it("should have equals button", () => {
    const equals = calculatorButtons.filter((btn) => btn.variant === "equal");
    expect(equals.length).toBe(1);
    expect(equals[0].label).toBe("=");
  });

  it("should have AC button", () => {
    const acButton = calculatorButtons.find((btn) => btn.label === "AC");
    expect(acButton).toBeDefined();
    expect(acButton?.variant).toBe("secondary");
  });

  it("should have zero button at expected position", () => {
    const zeroButton = calculatorButtons.find((btn) => btn.label === "0");
    expect(zeroButton).toBeDefined();
    expect(zeroButton?.variant).toBe("digit");
  });

  it("should have decimal point button", () => {
    const decimalButton = calculatorButtons.find((btn) => btn.label === ".");
    expect(decimalButton).toBeDefined();
    expect(decimalButton?.variant).toBe("digit");
  });

  it("should have percentage button", () => {
    const percentButton = calculatorButtons.find((btn) => btn.label === "%");
    expect(percentButton).toBeDefined();
    expect(percentButton?.variant).toBe("secondary");
  });

  it("should have all four operators", () => {
    const operators = calculatorButtons.filter(
      (btn) => btn.variant === "operator"
    );
    const operatorSymbols = operators.map((btn) => btn.label);
    expect(operatorSymbols).toContain("+");
    expect(operatorSymbols).toContain("-");
    expect(operatorSymbols).toContain("×");
    expect(operatorSymbols).toContain("÷");
  });
});
