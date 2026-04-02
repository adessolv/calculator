# Calculator App - Developer Documentation

## Project Overview

A modern, responsive React calculator application built with Vite. The calculator features a clean, minimalist design with dark mode styling, circular button layout, and comprehensive mathematical operations. It's optimized for performance with proper state management and includes full test coverage.

## Key Features

- ✅ **Circular Button Layout** - Modern 4×5 grid with circular buttons
- ✅ **Dark Mode UI** - Dark calculator card on light background with soft shadows
- ✅ **Number Formatting** - Thousands separators (spaces) with dot as decimal
- ✅ **Digit Limit** - Maximum 10 digits per number with visual feedback
- ✅ **Rich Operations** - Addition, subtraction, multiplication, division, percentages
- ✅ **Smart Sign Toggle** - Toggle positive/negative with ± button
- ✅ **Backspace Support** - Delete last character or clear all (AC)
- ✅ **Decimal Support** - Full decimal number calculations
- ✅ **Order of Operations** - Proper mathematical precedence (PEMDAS)
- ✅ **Error Handling** - Clear error messages for invalid operations
- ✅ **Responsive Design** - Centered, fixed-width (480px) layout
- ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard-friendly

## Technical Stack

### Frontend Framework

- **React** 18.3.1 - UI component library
- **Vite** 5.4.1 - Fast, modern build tool with HMR
- **JavaScript/JSX** - Modern ES6+ modules

### Styling

- **Custom CSS** - Pure CSS with modern features
- **Responsive Design** - Flexbox and Grid layouts
- **Accessibility** - Semantic HTML with ARIA attributes

### Testing

- **Vitest** 2.1.9 - Fast unit test framework
- **React Testing Library** 16.0.0 - Component testing utilities
- **@testing-library/user-event** 14.5.1 - User interaction simulation
- **jsdom** 24.0.0 - DOM environment for tests

### Development Tools

- **@vitejs/plugin-react** 4.3.1 - React JSX transformation
- **@vitest/ui** 2.0.5 - Visual test dashboard

## Project Structure

```
calculator/
├── src/
│   ├── components/
│   │   ├── Calculator.jsx          # Main calculator component
│   │   ├── Calculator.spec.tsx     # Calculator tests
│   │   ├── CalculatorButton.jsx    # Button component
│   │   ├── CalculatorButton.spec.tsx
│   │   ├── Display.jsx             # Display/output component
│   │   └── Display.spec.tsx
│   ├── constants/
│   │   ├── calculatorButtons.js    # Button configuration
│   │   └── calculatorButtons.spec.ts
│   ├── utils/
│   │   ├── calculator.js           # Core calculator logic
│   │   └── calculator.spec.ts
│   ├── App.jsx                     # Root app component
│   ├── App.spec.tsx                # App tests
│   ├── App.css                     # Global styles
│   ├── index.css                   # Base styles
│   └── main.jsx                    # Entry point
├── public/
│   └── vite.svg
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── vitest.config.ts                # Vitest configuration
├── vitest.setup.ts                 # Test setup
├── index.html                      # HTML template
├── DOCUMENTATION.md                # This file
├── TEST_GUIDE.md                   # Testing guide
└── README.md                       # Project readme
```

## Setup Instructions

### Prerequisites

- **Node.js** 16+ (includes npm)
- **Git** (optional, for cloning repository)

### Installation

1. **Clone or navigate to the project**

   ```bash
   cd calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs all required packages from `package.json`

### Running Development Server

Start the local development server with hot module replacement:

```bash
npm run dev
```

- Access the app at `http://localhost:5173` (default Vite port)
- Changes to files will automatically refresh the browser
- Terminal shows HMR updates in real-time

### Building for Production

Create an optimized production build:

```bash
npm run build
```

- Output generated in `dist/` directory
- All assets minified and optimized
- Ready for deployment

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

- Serves the built `dist/` directory
- Useful for testing production output before deployment

### Running Tests

#### Run all tests

```bash
npm test
```

- Executes all `.spec.ts` and `.spec.tsx` files
- Shows test results and pass/fail summary

#### Run tests in watch mode

```bash
npm test -- --watch
```

- Re-runs tests automatically when files change
- Interactive mode for development

#### View tests in UI dashboard

```bash
npm run test:ui
```

- Visual test dashboard at `http://localhost:51204`
- See test results with filtering and search
- Helpful for debugging test failures

#### Generate coverage report

```bash
npm run test:coverage
```

- Shows percentage of code covered by tests
- Identifies untested code paths
- Generate HTML reports with detailed breakdown

## Usage Guide

### Basic Calculator Operations

#### Simple Arithmetic

1. Click digits to enter a number (e.g., "5")
2. Click an operator (+, -, ×, ÷)
3. Enter another number (e.g., "3")
4. Press "=" to see result

**Example:** `5 + 3 =` → `8`

#### Multiple Operations

Chain operations together. The calculator follows proper order of operations:

**Example:** `2 + 3 × 4 =` → `14` (not 20)

#### Decimal Numbers

Click the "." button to add decimal point:

**Example:** `3.5 + 2.5 =` → `6`

### Special Features

#### Clear Display

- Press **AC** button to clear all and reset to 0
- Useful for starting a new calculation

#### Delete Last Digit

- Press **⌫** (backspace) button to remove last character
- Example: `123` → ⌫ → `12`

#### Toggle Sign

- Press **±** button to toggle between positive and negative
- Example: `5` → ± → `-5`

#### Percentage Calculation

- Press **%** to convert number to percentage (divide by 100)
- Example: `50 %` → `0.5`

#### Digit Limit Feedback

- Maximum 10 digits allowed per number
- When limit reached, a message appears: "Limit reached: max 10 digits"
- Message auto-hides after 3 seconds
- Backspace still works to edit
- Can enter new numbers after operators

### Display Features

- **Number Formatting** - Large numbers show with space separators
  - `1234567` displays as `1 234 567`
  - Makes reading large numbers easier

- **Decimal Separator** - Always uses dot (.) for decimal point
  - `1234567.89` displays as `1 234 567.89`

- **Live Updates** - Display updates immediately as you click buttons

- **Error Handling** - Shows "Error" if calculation fails
  - Example: Division by zero returns error

### Keyboard Tips

- **Tab** to navigate between buttons (sequential)
- **Enter/Space** to activate focused button
- **Backspace** to delete character (if button is focused)

## Code Style & Conventions

### Component Organization

- Components in `src/components/` directory
- Each component has its own `.jsx` file
- Test files use `.spec.tsx` naming convention
- Utility functions in `src/utils/`
- Constants in `src/constants/`

### Naming Conventions

- Components: PascalCase (`Calculator.jsx`)
- Functions: camelCase (`handleButtonClick`)
- Variables: camelCase (`displayValue`)
- Constants: UPPER_SNAKE_CASE (`DIGIT_LIMIT`)

### CSS Classes

- BEM-like naming: `.component-element`
- Examples: `.calculator-button`, `.calculator-display`

### State Management

- Uses React hooks (useState, useEffect)
- Single source of truth per component
- Clean separation of concerns

## Testing Overview

The project includes 98+ test cases covering:

- **Utility Functions** - 45 tests for calculator logic
- **Display Component** - 7 tests for rendering and formatting
- **Button Component** - 10 tests for interactions
- **Calculator Component** - 19 tests for workflows
- **Constants** - 13 tests for configuration
- **App Component** - 4 tests for structure

Tests follow best practices:

- Behavior-focused (not implementation details)
- Use React Testing Library user-centric queries
- Simulate real user interactions
- Comprehensive edge case coverage

See [TEST_GUIDE.md](./TEST_GUIDE.md) for detailed testing documentation.

## Deployment

### Deploy to Vercel

1. Connect repository to Vercel
2. Vercel auto-detects Vite configuration
3. Each push to main auto-deploys

### Deploy to Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploy to Static Host

1. Run `npm run build`
2. Upload contents of `dist/` folder to host
3. Configure server to serve `index.html` for all routes

### Environment Variables

- No environment variables required for basic setup
- Can add `.env` files for sensitive data

## Common Issues & Troubleshooting

### Port Already in Use

**Problem:** "Port 5173 is already in use"

```bash
npm run dev -- --port 5174
```

Runs development server on alternate port

### Tests Not Running

**Problem:** Tests timeout or don't run

```bash
npm test -- --no-coverage
```

Run without coverage to check if that's the issue

### Build Fails

**Problem:** `npm run build` fails

```bash
npm install
npm run build
```

Reinstall dependencies and rebuild

### Module Not Found

**Problem:** Import errors in development

```bash
npm install
```

Ensure all dependencies are installed

## Performance Optimization

### Implemented

- ✅ Lazy component loading with React
- ✅ Efficient re-renders with React hooks
- ✅ Minified production builds with Vite
- ✅ CSS-only styling (no bloat)
- ✅ No external UI libraries

### Best Practices

- Components are modular and reusable
- Utility functions are pure (no side effects)
- Proper state management to avoid unnecessary renders
- CSS is scoped to components

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

### Development Workflow

1. Create feature branch: `git checkout -b feature/calculator-history`
2. Make changes
3. Run tests: `npm test`
4. Commit: `git commit -m "Add calculator history"`
5. Push and create pull request

### Code Quality

- Run tests before committing
- Maintain test coverage above 80%
- Follow existing code style
- Update documentation for new features

## Resources

### Official Docs

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Vitest Docs](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)

### Project Files

- [Test Guide](./TEST_GUIDE.md) - Detailed testing documentation
- [README.md](./README.md) - Quick start guide

## License

MIT License - Use this project freely for personal and commercial projects.

## Version History

- **v0.0.1** - Initial release
  - Basic calculator operations
  - Dark mode UI with circular buttons
  - Digit limit with feedback
  - Number formatting
  - Comprehensive test suite
