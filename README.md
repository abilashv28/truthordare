# Truth or Dare Game

A modern web application for playing Truth or Dare with friends, featuring multiple categories of questions and a bottle spinner.

## Project Structure

The application has been organized into a modular structure for better maintainability:

```
src/
├── components/        # UI components
│   ├── BottleSpinner.tsx      # Spinning bottle animation
│   ├── BlogContent.tsx        # Blog content display
│   ├── CategorySelector.tsx   # Category selection UI
│   ├── Game.tsx               # Main game component
│   ├── History.tsx            # Game history display
│   ├── Navigation.tsx         # App navigation
│   ├── PlayerSelector.tsx     # Player selection UI
│   ├── PlayerTurn.tsx         # Player turn UI
│   ├── QuestionDisplay.tsx    # Question display
│   ├── TruthDareModal.tsx     # Truth/Dare modal
│   └── index.ts               # Component exports
├── data/              # Data and constants
│   ├── questions.ts           # Truth/Dare questions
│   └── index.ts               # Data exports
├── hooks/             # Custom React hooks
│   ├── useAppState.ts         # Application state management
│   ├── useGameLogic.ts        # Game logic
│   └── index.ts               # Hook exports
├── types/             # TypeScript type definitions
│   └── index.ts               # Type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
