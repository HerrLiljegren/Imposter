# Architecture Documentation

## Overview

This is a React Native (Expo) application implementing a social hidden-identity game called "Imposter". The application follows clean architecture principles with clear separation of concerns.

## Design Principles

### Separation of Concerns
- **Logic Layer**: `useGameState` hook manages all game state and business logic
- **UI Layer**: `GameScreen` and `PeekCard` components handle presentation
- **Type Safety**: TypeScript interfaces define all data structures

### Naming Conventions
All names are explicit and descriptive:
- `identityVisibilityStatus` - Boolean indicating if role is currently visible
- `assignedRole` - Player's role (Imposter or Civilian)
- `proceedToNextPlayer` - Function to advance to next player
- `markCurrentPlayerAsViewed` - Function to mark player has seen their role

## Project Structure

```
src/
├── types/
│   └── index.ts              # TypeScript type definitions
├── hooks/
│   └── useGameState.ts       # Game state management hook
├── components/
│   └── PeekCard.tsx          # Peek interaction component
└── screens/
    └── GameScreen.tsx        # Main game screen
```

## Core Components

### 1. Types (`src/types/index.ts`)

Defines the data structures:
- `PlayerRole`: 'Imposter' | 'Civilian'
- `Player`: Player information including role and view status
- `GamePhase`: 'setup' | 'passing' | 'playing'
- `GameState`: Complete game state

### 2. Game State Hook (`src/hooks/useGameState.ts`)

Manages all game logic:

**State:**
- `players`: Array of all players with roles
- `currentPlayerIndex`: Index of player currently viewing
- `secretWord`: The secret word for civilians
- `gamePhase`: Current phase of the game

**Functions:**
- `initializeGame(numberOfPlayers)`: Creates players and assigns roles
- `markCurrentPlayerAsViewed()`: Marks current player as having seen their role
- `proceedToNextPlayer()`: Advances to next player or playing phase
- `resetGame()`: Resets to setup phase
- `getCurrentPlayer()`: Returns current player object

**Logic:**
- Randomly assigns one player as Imposter
- Randomly selects a secret word from predefined list
- Manages player progression through peek phase
- Transitions to playing phase when all have peeked

### 3. Peek Card Component (`src/components/PeekCard.tsx`)

Handles the peek interaction:

**Features:**
- Full-screen pressable area
- `onPressIn`: Shows role, triggers haptic feedback
- `onPressOut`: Hides role
- BlurView overlay when not peeking for safety
- Different displays for Imposter vs Civilian
- Continue button appears when peeking

**Props:**
- `player`: Current player object
- `secretWord`: The secret word
- `onPeekComplete`: Callback when player finishes peeking

### 4. Game Screen (`src/screens/GameScreen.tsx`)

Main UI orchestrator with three phases:

**Setup Phase:**
- Input for number of players (3-10)
- Game rules display
- Start button

**Passing Phase:**
- Shows current player name
- Renders PeekCard component
- Manages player progression

**Playing Phase:**
- Game summary
- Player counts
- New Game button

## Game Flow

```
Setup Phase
    ↓
  Start Game (initializeGame)
    ↓
Passing Phase (Player 1)
    ↓
  Peek at Role → Continue (proceedToNextPlayer)
    ↓
Passing Phase (Player 2)
    ↓
  Peek at Role → Continue
    ↓
    ... (repeat for all players)
    ↓
Playing Phase
    ↓
  New Game (resetGame) → Back to Setup
```

## Role Assignment Algorithm

1. Create array of N players
2. All players initially set to 'Civilian'
3. Generate random index: `Math.floor(Math.random() * N)`
4. Assign that player as 'Imposter'
5. Result: Exactly 1 Imposter, N-1 Civilians

## Security Features

### Blur Overlay
When not actively peeking:
- BlurView component with intensity 100
- Dark overlay (rgba(0, 0, 0, 0.7))
- "HIDDEN" text display
- Prevents accidental role reveals

### Haptic Feedback
- Triggers on `onPressIn` (when starting to peek)
- Uses `Haptics.ImpactFeedbackStyle.Medium`
- Provides tactile confirmation

## UI/UX Design

### Theme
- **Background**: #1A2238 (dark blue-gray)
- **Accent**: #FFD700 (gold)
- **Error/Imposter**: #FF6B6B (red)
- **Text**: #FFFFFF (white)

### Typography
- Large, clean sans-serif fonts
- Title: 48pt bold with letter-spacing
- Role display: 24-56pt based on context
- Instructions: 16-20pt

### Visual Hierarchy
1. Player name (gold, 32pt)
2. Instructions (white, 16pt)
3. Peek area (full screen)
4. Continue button (gold background, bottom)

## State Management Pattern

Uses React's built-in `useState` and `useCallback`:
- No external state libraries needed
- Simple, predictable state updates
- Immutable state updates with spread operators

Example state update:
```typescript
setGameState(prev => ({
  ...prev,
  currentPlayerIndex: prev.currentPlayerIndex + 1,
}));
```

## Dependencies

### Core
- `react`: 19.1.0
- `react-native`: 0.81.5
- `expo`: ~54.0.30

### Features
- `expo-haptics`: Tactile feedback
- `expo-blur`: Visual privacy overlay
- `expo-status-bar`: Status bar theming

### Development
- `typescript`: ~5.9.2
- `@types/react`: ~19.1.0

## Testing Strategy

The application can be tested through:
1. TypeScript compilation (`npx tsc --noEmit`)
2. Manual testing via Expo Go app
3. Logic validation (game state management)

## Future Enhancements

Potential improvements:
- Custom word lists
- Timer for discussions
- Voting mechanism
- Game history/statistics
- Custom player names
- Multiple imposters mode
- Sound effects
- Animations for transitions
