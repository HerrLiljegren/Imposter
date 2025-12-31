# Imposter

A React Native (Expo) social hidden-identity game where players must identify the imposter among them.

## Features

- **Role Assignment**: One random player is assigned as the "Imposter", others are "Civilians"
- **Peek Interaction**: Full-screen button with hold-to-peek functionality using haptic feedback
- **Secret Word System**: Civilians see a secret word, Imposter sees their role
- **Safety Features**: Blur overlay when not actively peeking at your role
- **Dark Minimalist Theme**: Clean design with #1A2238 background and #FFD700 accents

## Architecture

- **Separation of Concerns**: `useGameState` hook handles all game logic
- **Clean UI Components**: `GameScreen` for views, `PeekCard` for peek interaction
- **TypeScript**: Full type safety throughout the application
- **Explicit Naming**: Clear variable names like `identityVisibilityStatus`, `assignedRole`, `proceedToNextPlayer`

## Installation

```bash
npm install
```

## Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## How to Play

1. **Setup**: Enter the number of players (3-10)
2. **Passing Phase**: Each player takes turns peeking at their role
3. **Game Phase**: Discuss and try to identify the Imposter!

## Project Structure

```
src/
├── components/
│   └── PeekCard.tsx       # Peek interaction component with blur
├── hooks/
│   └── useGameState.ts    # Game logic and state management
├── screens/
│   └── GameScreen.tsx     # Main game UI
└── types/
    └── index.ts           # TypeScript type definitions
```

## Technologies

- React Native
- Expo
- TypeScript
- expo-haptics
- expo-blur
