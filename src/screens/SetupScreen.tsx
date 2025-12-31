import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface SetupScreenProps {
  onStartGame: (playerCount: number, spyCount: number) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [playerCount, setPlayerCount] = useState('4');
  const [spyCount, setSpyCount] = useState('1');

  const handleStartGame = () => {
    const players = parseInt(playerCount, 10);
    const spies = parseInt(spyCount, 10);

    if (isNaN(players) || players < 2) {
      alert('Please enter at least 2 players');
      return;
    }

    if (isNaN(spies) || spies < 1 || spies >= players) {
      alert('Spy count must be between 1 and less than total players');
      return;
    }

    onStartGame(players, spies);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Imposter</Text>
        <Text style={styles.subtitle}>Pass-the-Phone Spy Game</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Players</Text>
          <TextInput
            style={styles.input}
            value={playerCount}
            onChangeText={setPlayerCount}
            keyboardType="number-pad"
            maxLength={2}
            selectTextOnFocus
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Spies</Text>
          <TextInput
            style={styles.input}
            value={spyCount}
            onChangeText={setSpyCount}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.heading.fontSize,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    marginTop: spacing.md,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.button,
    color: colors.text,
  },
});
