function CalculatorButton({ label, variant, size, onClick }) {
  return (
    <button
      type="button"
      className={`calculator-button ${variant} ${size || ""}`.trim()}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CalculatorButton;
