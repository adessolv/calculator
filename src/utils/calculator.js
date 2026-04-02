const OPERATOR_PATTERN = /[+\-×÷]/;
const DIGIT_LIMIT = 10;

export const isOperator = (value) => OPERATOR_PATTERN.test(value);

const normalizeExpression = (display) =>
  display.replace(/×/g, "*").replace(/÷/g, "/");

const countDigits = (segment) => {
  return segment.replace(/[^0-9]/g, "").length;
};

export const formatDisplayNumber = (display) => {
  if (display === "Error" || display === "0") {
    return display;
  }

  const segments = display.split(OPERATOR_PATTERN);
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment || lastSegment === ".") {
    return display;
  }

  try {
    const numberValue = parseFloat(lastSegment);

    if (!isNaN(numberValue) && lastSegment !== "") {
      // Format with space as thousand separator and dot as decimal
      const formatted = new Intl.NumberFormat("de-CH", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
        useGrouping: true,
      })
        .format(numberValue)
        .replace(",", ".");

      const prefix = display.slice(0, display.length - lastSegment.length);
      return prefix + formatted;
    }
  } catch (e) {
    return display;
  }

  return display;
};

export const clearDisplay = () => "0";

export const deleteLastCharacter = (display) => {
  if (display === "Error") {
    return "0";
  }

  const nextValue = display.slice(0, -1);
  if (nextValue === "" || nextValue === "-") {
    return "0";
  }

  return nextValue;
};

export const appendInput = (display, input) => {
  if (display === "Error") {
    return input === "." ? "0." : input;
  }

  const lastChar = display.slice(-1);
  const currentSegment = display.split(OPERATOR_PATTERN).pop();

  if (input === ".") {
    if (currentSegment.includes(".")) {
      return display;
    }

    return isOperator(lastChar) ? `${display}0.` : `${display}.`;
  }

  if (isOperator(input)) {
    if (display === "0" && input === "-") {
      return "-";
    }

    if (isOperator(lastChar)) {
      return `${display.slice(0, -1)}${input}`;
    }

    return `${display}${input}`;
  }

  // Check digit limit before adding a digit
  if (/\d/.test(input)) {
    if (countDigits(currentSegment) >= DIGIT_LIMIT) {
      return display;
    }
  }

  if (display === "0") {
    return input;
  }

  if (display === "-0") {
    return `-${input}`;
  }

  return `${display}${input}`;
};

export const toggleSign = (display) => {
  if (display === "Error") {
    return "0";
  }

  const match = display.match(/(-?\d*\.?\d+)$/);
  if (!match) {
    return display;
  }

  const [numberSegment] = match;
  const prefix = display.slice(0, display.length - numberSegment.length);
  const toggled = numberSegment.startsWith("-")
    ? numberSegment.slice(1)
    : `-${numberSegment}`;

  if (prefix === "" && toggled === "-0") {
    return "0";
  }

  return `${prefix}${toggled}`;
};

export const applyPercentage = (display) => {
  if (display === "Error") {
    return "0";
  }

  const match = display.match(/(-?\d*\.?\d+)$/);
  if (!match) {
    return display;
  }

  const [numberSegment] = match;
  const prefix = display.slice(0, display.length - numberSegment.length);
  const percentValue = String(Number(numberSegment) / 100);

  return `${prefix}${percentValue}`;
};

export const evaluateExpression = (display) => {
  if (display === "Error") {
    return "0";
  }

  const normalized = normalizeExpression(display).replace(/[+\-*/]+$/, "");
  if (normalized === "") {
    return "0";
  }

  const safeExpression = normalized.replace(/[^0-9+\-*/.()]/g, "");

  try {
    const value = Function(`"use strict"; return (${safeExpression})`)();
    if (
      typeof value !== "number" ||
      Number.isNaN(value) ||
      !Number.isFinite(value)
    ) {
      return "Error";
    }

    return String(value);
  } catch {
    return "Error";
  }
};

export const isDigitLimitReached = (display, input) => {
  if (!/\d/.test(input)) {
    return false;
  }

  const OPERATOR_PATTERN = /[+\-×÷]/;
  const currentSegment = display.split(OPERATOR_PATTERN).pop();
  return countDigits(currentSegment) >= DIGIT_LIMIT;
};
