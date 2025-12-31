# Usage Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HerrLiljegren/Imposter.git
cd Imposter
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Development Mode

Start the Expo development server:
```bash
npm start
```

This will open the Expo Developer Tools in your browser.

#### Run on Mobile Device

1. Install "Expo Go" app on your iOS or Android device
2. Run `npm start`
3. Scan the QR code with your device camera (iOS) or Expo Go app (Android)

#### Run on Simulator/Emulator

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For Web:
```bash
npm run web
```

## How to Play

### Game Setup

1. **Launch the app** - You'll see the setup screen with the game title
2. **Enter number of players** - Input between 3-10 players
3. **Tap "Start Game"** - This initializes the game

### Passing Phase

1. **Pass to Player 1** - Hand the device to the first player
2. **Hold to Peek** - Player presses and holds the screen to reveal their role
3. **View Role**:
   - **If Civilian**: You'll see "Secret Word: [WORD]"
   - **If Imposter**: You'll see "You are the IMPOSTER"
4. **Release to Hide** - Release your finger to hide the role again
5. **Tap Continue** - When ready, tap the Continue button
6. **Pass Device** - Hand to the next player
7. **Repeat** - Continue until all players have peeked

### Playing Phase

1. **Discussion** - All players discuss and ask questions
2. **Goal for Civilians** - Identify the Imposter
3. **Goal for Imposter** - Blend in without being caught
4. **New Game** - Tap "New Game" button to start over

## Game Tips

### For Civilians
- Pay attention to how others describe the word
- Look for inconsistencies in explanations
- Don't reveal the word directly
- Ask open-ended questions

### For the Imposter
- Listen carefully to others' descriptions
- Give vague but plausible answers
- Try to deduce what the word might be
- Mirror the behavior of civilians

## Privacy Features

### Blur Overlay
- The screen shows a blur overlay when not actively peeking
- "HIDDEN" text displays to prevent accidental reveals
- Only visible when pressing and holding

### Haptic Feedback
- Your device vibrates when you start peeking
- Confirms your press is registered
- Works on devices that support haptics

## UI Elements

### Setup Screen
- **Title**: IMPOSTER in gold
- **Player Input**: Enter number (3-10)
- **Start Button**: Gold button to begin
- **Rules**: Brief explanation of gameplay

### Passing Screen
- **Player Name**: Shows current player at top
- **Peek Area**: Full-screen pressable area
- **Continue Button**: Appears while peeking
- **Blur Overlay**: Shows when not peeking

### Playing Screen
- **Game Summary**: Shows player counts
- **New Game Button**: Restart the game

## Troubleshooting

### App won't start
- Ensure all dependencies are installed: `npm install`
- Clear Expo cache: `npx expo start -c`

### Blur not working
- Blur effects may not work on web
- Use a real device or emulator for full experience

### Haptic feedback not working
- Haptics only work on physical devices
- Not available in web browser or some emulators

### TypeScript errors
- Run type checking: `npx tsc --noEmit`
- Check that all dependencies are installed

## Development

### File Structure
```
Imposter/
├── src/
│   ├── components/      # UI components
│   ├── hooks/          # Custom React hooks
│   ├── screens/        # Screen components
│   └── types/          # TypeScript types
├── assets/             # Images and icons
├── App.tsx            # App entry point
└── package.json       # Dependencies
```

### Making Changes

1. Edit files in `src/` directory
2. Expo will automatically reload
3. Check TypeScript: `npx tsc --noEmit`
4. Test on device or simulator

### Code Style
- Functional components only
- TypeScript for type safety
- StyleSheet for styling
- Explicit, descriptive naming

## Technical Details

### Theme Colors
- Background: `#1A2238` (dark blue-gray)
- Accent: `#FFD700` (gold)
- Imposter text: `#FF6B6B` (red)

### State Management
- Uses React hooks (`useState`, `useCallback`)
- `useGameState` custom hook for game logic
- No external state management library

### Dependencies
- `expo-haptics`: Vibration feedback
- `expo-blur`: Visual blur effect
- TypeScript: Type safety

## Support

For issues or questions:
1. Check this documentation
2. Review ARCHITECTURE.md for technical details
3. Open an issue on GitHub
