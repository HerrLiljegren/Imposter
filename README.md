# Imposter

A React Native (Expo) "Pass-the-Phone" spy game.

## Overview

Imposter is a mobile party game where players pass a phone around to secretly see their roles. One or more players are assigned as "Spy" while others are "Normal" players who see a secret word. The goal is to figure out who the spy is through discussion!

## Features

- **Setup Screen**: Configure the number of players and spies
- **Game Flow**: 
  - Each player holds the screen to reveal their word/role
  - Haptic feedback provides tactile confirmation
  - Clean pass-to-next-player flow
- **Dark Theme**: Beautiful dark UI with #1A2238 background
- **TypeScript**: Fully typed codebase for reliability

## Project Structure

```
├── App.tsx                    # Main app component
├── src/
│   ├── logic/
│   │   └── gameLogic.ts       # Game state management and role shuffling
│   ├── screens/
│   │   ├── SetupScreen.tsx    # Player configuration screen
│   │   └── GameScreen.tsx     # Main game screen with reveal/pass flow
│   └── styles/
│       └── theme.ts           # Design system (colors, typography)
├── assets/                    # App icons and splash screens
└── package.json              # Dependencies and scripts
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your device:
   - **iOS**: Scan the QR code with the Camera app
   - **Android**: Scan the QR code with the Expo Go app
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal

## How to Play

1. **Setup**: Enter the number of players and spies
2. **Game Loop**:
   - Player X sees "Hold to reveal"
   - Long press the screen to see your word
   - Release and pass to the next player
3. **Discussion**: Players discuss to find the spy!

## Technology Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development and build toolchain
- **TypeScript**: Type-safe JavaScript
- **Expo Haptics**: Touch feedback

## Development

The codebase follows a clear separation of concerns:

- **Logic Layer** (`src/logic/`): Pure game logic, no UI dependencies
- **UI Layer** (`src/screens/`, `src/styles/`): React Native components
- **Type Safety**: Full TypeScript coverage

## License

MIT