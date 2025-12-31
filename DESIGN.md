# UI Flow Documentation

## Screen Flow

```
┌─────────────────────────┐
│                         │
│   Setup Screen          │
│                         │
│   Imposter             │
│   Pass-the-Phone        │
│   Spy Game             │
│                         │
│   Number of Players     │
│   ┌─────────┐          │
│   │    4    │          │
│   └─────────┘          │
│                         │
│   Number of Spies       │
│   ┌─────────┐          │
│   │    1    │          │
│   └─────────┘          │
│                         │
│   ┌─────────────┐      │
│   │ Start Game  │      │
│   └─────────────┘      │
│                         │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│  Restart      1/4       │
├─────────────────────────┤
│                         │
│                         │
│      Player 1           │
│                         │
│   Hold to reveal        │
│    your word            │
│                         │
│  [Long press area]      │
│                         │
│                         │
└─────────────────────────┘
            ↓ (Long Press)
┌─────────────────────────┐
│  Restart      1/4       │
├─────────────────────────┤
│                         │
│                         │
│                         │
│       Apple             │
│   (or "Spy")            │
│                         │
│   Keep holding...       │
│                         │
│                         │
└─────────────────────────┘
            ↓ (Release)
┌─────────────────────────┐
│  Restart      1/4       │
├─────────────────────────┤
│                         │
│                         │
│   You saw your word!    │
│                         │
│   ┌─────────────────┐  │
│   │ Pass to Next    │  │
│   │    Player       │  │
│   └─────────────────┘  │
│                         │
│                         │
└─────────────────────────┘
```

## Color Scheme

- Background: `#1A2238` (Dark blue-gray)
- Primary (Buttons): `#FF6A3D` (Orange)
- Secondary (Normal word): `#F4DB7D` (Gold)
- Accent (Spy word): `#F95959` (Red)
- Text: `#FFFFFF` (White)
- Text Secondary: `#9DA9C0` (Light gray)

## Typography

- Title: 32px, Bold
- Heading: 24px, Semibold
- Body: 18px, Regular
- Button: 20px, Semibold
- Word Reveal: 48px, Bold

## Interaction Flow

1. **Setup Phase**
   - Enter player count (2-99)
   - Enter spy count (1 to n-1)
   - Tap "Start Game" button

2. **Game Phase - Each Player**
   - Screen shows: "Player X: Hold to reveal"
   - Player long-presses anywhere on screen
   - Haptic feedback triggers
   - Word appears (e.g., "Apple" or "Spy")
   - Player releases screen
   - "Pass to next player" button appears
   - Player taps button to proceed

3. **Game Loop**
   - Cycles through all players
   - Returns to Player 1 after last player
   - Can restart anytime via "Restart" button
