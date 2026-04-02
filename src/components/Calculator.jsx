import { useState, useEffect } from "react";
import { calculatorButtons } from "../constants/calculatorButtons";
import Display from "./Display";
import CalculatorButton from "./CalculatorButton";
import {
  appendInput,
  applyPercentage,
  clearDisplay,
  deleteLastCharacter,
  evaluateExpression,
  toggleSign,
  isDigitLimitReached,
} from "../utils/calculator";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [limitMessage, setLimitMessage] = useState("");

  useEffect(() => {
    if (limitMessage) {
      const timer = setTimeout(() => setLimitMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [limitMessage]);

  const handleButtonClick = (button) => {
    switch (button.value) {
      case "AC":
        setDisplay(clearDisplay());
        setLimitMessage("");
        return;
      case "BACK":
        setDisplay(deleteLastCharacter(display));
        setLimitMessage("");
        return;
      case "TOGGLE_SIGN":
        setDisplay(toggleSign(display));
        setLimitMessage("");
        return;
      case "%":
        setDisplay(applyPercentage(display));
        setLimitMessage("");
        return;
      case "=":
        setDisplay(evaluateExpression(display));
        setLimitMessage("");
        return;
      case "+":
      case "-":
      case "×":
      case "÷":
        setDisplay(appendInput(display, button.value));
        setLimitMessage("");
        return;
      default:
        if (isDigitLimitReached(display, button.value)) {
          setLimitMessage("Limit reached: max 10 digits");
        } else {
          setLimitMessage("");
          setDisplay(appendInput(display, button.value));
        }
    }
  };

  return (
    <section className="calculator-shell" aria-label="Calculator">
      <div className="calculator-panel">
        <Display value={display} />
        {limitMessage && (
          <div className="calculator-hint" role="status">
            {limitMessage}
          </div>
        )}

        <div className="calculator-grid">
          {calculatorButtons.map((button) => (
            <CalculatorButton
              key={button.id}
              label={button.label}
              variant={button.variant}
              size={button.size}
              onClick={() => handleButtonClick(button)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Calculator;
