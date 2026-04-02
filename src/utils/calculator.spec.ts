import { describe, it, expect } from "vitest";
import {
  isOperator,
  formatDisplayNumber,
  clearDisplay,
  deleteLastCharacter,
  appendInput,
  toggleSign,
  applyPercentage,
  evaluateExpression,
  isDigitLimitReached,
} from "./calculator";

describe("calculator utils", () => {
  describe("isOperator", () => {
    it("should identify operator symbols", () => {
      expect(isOperator("+")).toBe(true);
      expect(isOperator("-")).toBe(true);
      expect(isOperator("×")).toBe(true);
      expect(isOperator("÷")).toBe(true);
    });

    it("should return false for non-operators", () => {
      expect(isOperator("5")).toBe(false);
      expect(isOperator(".")).toBe(false);
      expect(isOperator("=")).toBe(false);
    });
  });

  describe("formatDisplayNumber", () => {
    it("should format large numbers with space separators", () => {
      expect(formatDisplayNumber("1234567")).toBe("1 234 567");
    });

    it("should preserve decimals with dot separator", () => {
      expect(formatDisplayNumber("1234567.89")).toBe("1 234 567.89");
    });

    it("should format only last segment in expressions", () => {
      expect(formatDisplayNumber("1234+5678")).toContain("5 678");
    });

    it("should return Error unchanged", () => {
      expect(formatDisplayNumber("Error")).toBe("Error");
    });

    it("should return 0 unchanged", () => {
      expect(formatDisplayNumber("0")).toBe("0");
    });

    it("should handle single digit numbers", () => {
      expect(formatDisplayNumber("5")).toBe("5");
    });
  });

  describe("clearDisplay", () => {
    it("should return 0", () => {
      expect(clearDisplay()).toBe("0");
    });
  });

  describe("deleteLastCharacter", () => {
    it("should remove last character from display", () => {
      expect(deleteLastCharacter("123")).toBe("12");
    });

    it("should return 0 for empty string", () => {
      expect(deleteLastCharacter("1")).toBe("0");
    });

    it("should return 0 for minus sign only", () => {
      expect(deleteLastCharacter("-")).toBe("0");
    });

    it("should reset display on Error", () => {
      expect(deleteLastCharacter("Error")).toBe("0");
    });

    it("should handle decimal numbers", () => {
      expect(deleteLastCharacter("12.5")).toBe("12.");
    });
  });

  describe("appendInput", () => {
    it("should append digits to display", () => {
      expect(appendInput("0", "5")).toBe("5");
      expect(appendInput("5", "3")).toBe("53");
    });

    it("should not append duplicate decimal points", () => {
      expect(appendInput("1.5", ".")).toBe("1.5");
    });

    it("should add decimal point with 0 prefix after operator", () => {
      expect(appendInput("5+", ".")).toBe("5+0.");
    });

    it("should handle operator appending", () => {
      expect(appendInput("5", "+")).toBe("5+");
      expect(appendInput("5+", "-")).toBe("5-");
    });

    it("should allow negative signs at start", () => {
      expect(appendInput("0", "-")).toBe("-");
    });

    it("should enforce digit limit (10 digits)", () => {
      expect(appendInput("1234567890", "5")).toBe("1234567890");
    });

    it("should transition from Error with digit", () => {
      expect(appendInput("Error", "5")).toBe("5");
    });

    it("should transition from Error with decimal", () => {
      expect(appendInput("Error", ".")).toBe("0.");
    });

    it("should handle -0 to -digit transition", () => {
      expect(appendInput("-0", "5")).toBe("-5");
    });
  });

  describe("toggleSign", () => {
    it("should toggle positive to negative", () => {
      expect(toggleSign("5")).toBe("-5");
    });

    it("should toggle negative to positive", () => {
      expect(toggleSign("-5")).toBe("5");
    });

    it("should toggle sign in expressions", () => {
      expect(toggleSign("5+10")).toBe("5+-10");
    });

    it("should return 0 for -0", () => {
      expect(toggleSign("-0")).toBe("0");
    });

    it("should reset on Error", () => {
      expect(toggleSign("Error")).toBe("0");
    });

    it("should handle decimal numbers", () => {
      expect(toggleSign("3.5")).toBe("-3.5");
    });
  });

  describe("applyPercentage", () => {
    it("should convert number to percentage", () => {
      expect(applyPercentage("50")).toBe("0.5");
    });

    it("should apply percentage to last segment", () => {
      expect(applyPercentage("100+50")).toContain("0.5");
    });

    it("should handle decimal percentages", () => {
      expect(applyPercentage("5.5")).toBe("0.055");
    });

    it("should reset on Error", () => {
      expect(applyPercentage("Error")).toBe("0");
    });
  });

  describe("evaluateExpression", () => {
    it("should add two numbers", () => {
      expect(evaluateExpression("5+3")).toBe("8");
    });

    it("should subtract two numbers", () => {
      expect(evaluateExpression("10-3")).toBe("7");
    });

    it("should multiply two numbers", () => {
      expect(evaluateExpression("5×3")).toBe("15");
    });

    it("should divide two numbers", () => {
      expect(evaluateExpression("15÷3")).toBe("5");
    });

    it("should follow order of operations", () => {
      expect(evaluateExpression("2+3×4")).toBe("14");
    });

    it("should handle trailing operators", () => {
      expect(evaluateExpression("5+")).toBe("5");
    });

    it("should handle empty expression", () => {
      expect(evaluateExpression("")).toBe("0");
    });

    it("should return Error for invalid expressions", () => {
      expect(evaluateExpression("5/0")).toBe("Error");
    });

    it("should return Error on Error input", () => {
      expect(evaluateExpression("Error")).toBe("0");
    });

    it("should handle decimal calculations", () => {
      expect(evaluateExpression("1.5+2.5")).toBe("4");
    });

    it("should handle negative numbers", () => {
      expect(evaluateExpression("-5+3")).toBe("-2");
    });
  });

  describe("isDigitLimitReached", () => {
    it("should return false for 9 digits", () => {
      expect(isDigitLimitReached("123456789", "0")).toBe(false);
    });

    it("should return true for 10 digits", () => {
      expect(isDigitLimitReached("1234567890", "5")).toBe(true);
    });

    it("should return false for non-digit input", () => {
      expect(isDigitLimitReached("1234567890", "+")).toBe(false);
    });

    it("should count only digits in last segment", () => {
      expect(isDigitLimitReached("123+1234567890", "5")).toBe(true);
    });

    it("should return false for empty display", () => {
      expect(isDigitLimitReached("0", "5")).toBe(false);
    });
  });
});
