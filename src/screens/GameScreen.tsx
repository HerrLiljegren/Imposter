import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography } from '../styles/theme';
import { GameState, getCurrentPlayer, nextPlayer } from '../logic/gameLogic';

interface GameScreenProps {
  gameState: GameState;
  onNextPlayer: (newState: GameState) => void;
  onRestart: () => void;
}

export default function GameScreen({ gameState, onNextPlayer, onRestart }: GameScreenProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const currentPlayer = getCurrentPlayer(gameState);

  const handlePressIn = async () => {
    setIsRevealing(true);
    setHasRevealed(true);
    // Trigger haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePressOut = () => {
    setIsRevealing(false);
  };

  const handlePassToNext = async () => {
    const newState = nextPlayer(gameState);
    onNextPlayer(newState);
    setHasRevealed(false);
    // Trigger haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderContent = () => {
    if (isRevealing) {
      // Show the word while pressing
      return (
        <View style={styles.revealContainer}>
          <Text style={[
            styles.wordText,
            currentPlayer.role === 'Spy' ? styles.spyText : styles.normalText
          ]}>
            {currentPlayer.word}
          </Text>
          <Text style={styles.hintText}>Keep holding...</Text>
        </View>
      );
    } else if (hasRevealed) {
      // Show pass button after releasing
      return (
        <View style={styles.passContainer}>
          <Text style={styles.instructionText}>You saw your word!</Text>
          <TouchableOpacity style={styles.passButton} onPress={handlePassToNext}>
            <Text style={styles.passButtonText}>Pass to Next Player</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Show initial hold to reveal prompt
      return (
        <View style={styles.promptContainer}>
          <Text style={styles.playerNumberText}>Player {currentPlayer.id}</Text>
          <Text style={styles.instructionText}>Hold to reveal your word</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
        <Text style={styles.progressText}>
          {gameState.currentPlayerIndex + 1} / {gameState.totalPlayers}
        </Text>
      </View>

      <Pressable
        style={styles.revealArea}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={hasRevealed}
      >
        {renderContent()}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.xl,
  },
  restartButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  restartButtonText: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  revealArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  promptContainer: {
    alignItems: 'center',
  },
  playerNumberText: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
  },
  instructionText: {
    ...typography.heading,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  revealContainer: {
    alignItems: 'center',
  },
  wordText: {
    ...typography.wordReveal,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  spyText: {
    color: colors.accent,
  },
  normalText: {
    color: colors.secondary,
  },
  hintText: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
  },
  passContainer: {
    alignItems: 'center',
    width: '100%',
  },
  passButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    marginTop: spacing.lg,
    minWidth: 250,
    alignItems: 'center',
  },
  passButtonText: {
    ...typography.button,
    color: colors.text,
  },
});
