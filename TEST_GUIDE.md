# Calculator App Tests

Comprehensive unit tests using Vitest and React Testing Library.

## Test Coverage

### Utility Functions (`src/utils/calculator.spec.ts`)

- ✅ `isOperator` - Identifies operator symbols
- ✅ `formatDisplayNumber` - Formats numbers with space separators
- ✅ `clearDisplay` - Resets display to 0
- ✅ `deleteLastCharacter` - Removes last digit
- ✅ `appendInput` - Appends digits/operators with validation
- ✅ `toggleSign` - Toggles positive/negative numbers
- ✅ `applyPercentage` - Converts number to percentage
- ✅ `evaluateExpression` - Calculates expressions with proper order of operations
- ✅ `isDigitLimitReached` - Checks 10-digit limit enforcement

### Components

#### Display Component (`src/components/Display.spec.tsx`)

- ✅ Renders display value
- ✅ Formats large numbers with space thousands separators
- ✅ Displays formatted decimals
- ✅ Shows Error state
- ✅ Has proper accessibility attributes (aria-live)
- ✅ Updates on prop changes
- ✅ Handles expression display

#### CalculatorButton Component (`src/components/CalculatorButton.spec.tsx`)

- ✅ Renders button with label
- ✅ Handles click events
- ✅ Applies correct variant classes (digit, operator, secondary, equal)
- ✅ Applies size classes
- ✅ Renders special characters (÷, ×, ⌫, ±)

#### Calculator Component (`src/components/Calculator.spec.tsx`)

- ✅ Renders with initial display of 0
- ✅ Builds multi-digit numbers
- ✅ Performs addition, subtraction, multiplication, division
- ✅ Follows order of operations
- ✅ Clears display with AC button
- ✅ Deletes last character with backspace
- ✅ Handles decimal input
- ✅ Toggles sign with ± button
- ✅ Applies percentage calculation
- ✅ Shows limit message when 10-digit limit reached
- ✅ Auto-hides limit message after 3 seconds
- ✅ Allows new number after operator at digit limit
- ✅ Handles chained operations

#### App Component (`src/App.spec.tsx`)

- ✅ Renders the app
- ✅ Renders calculator component
- ✅ Displays initial value of 0
- ✅ Has proper styling structure

#### Constants (`src/constants/calculatorButtons.spec.ts`)

- ✅ Exports array of 20 buttons
- ✅ Has unique button IDs
- ✅ All buttons have required properties
- ✅ Has valid button variants
- ✅ Contains all operators, digits, and special buttons

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in UI mode

```bash
npm run test:ui
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run tests in watch mode

```bash
npm test -- --watch
```

### Run specific test file

```bash
npm test -- calculator.spec.ts
```

## Test Structure

Tests follow the naming convention `.spec.ts` or `.spec.tsx` and are located alongside their corresponding source files in the project structure:

```
src/
├── utils/
│   ├── calculator.js
│   └── calculator.spec.ts
├── components/
│   ├── Calculator.jsx
│   ├── Calculator.spec.tsx
│   ├── CalculatorButton.jsx
│   ├── CalculatorButton.spec.tsx
│   ├── Display.jsx
│   └── Display.spec.tsx
├── constants/
│   ├── calculatorButtons.js
│   └── calculatorButtons.spec.ts
├── App.jsx
└── App.spec.tsx
```

## Testing Libraries

- **Vitest** - Fast unit test framework with Vite integration
- **React Testing Library** - Component testing with user-centric queries
- **@testing-library/user-event** - Realistic user interactions
- **@testing-library/jest-dom** - Custom matchers for DOM elements

## Key Testing Concepts

### Utility Testing

Pure functions are tested with various inputs and edge cases to ensure correct output.

### Component Testing

Components are tested by rendering them and verifying both behavior and UI output using React Testing Library's best practices.

### User Interactions

Tests simulate real user clicks and inputs rather than testing implementation details.

### Accessibility

Tests verify ARIA attributes and semantic HTML for better accessibility practices.

## Best Practices Used

1. ✅ Tests organized near corresponding files
2. ✅ Descriptive test names that explain what is being tested
3. ✅ Comprehensive edge case coverage
4. ✅ No implementation detail testing (behavior-focused)
5. ✅ Proper setup and teardown with vitest hooks
6. ✅ User-centric assertions
7. ✅ Async/await handling for timers and user events
