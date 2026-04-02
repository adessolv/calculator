import { formatDisplayNumber } from "../utils/calculator";

function Display({ value }) {
  const displayValue = formatDisplayNumber(value);

  return (
    <div className="calculator-display" aria-live="polite">
      {displayValue}
    </div>
  );
}

export default Display;
