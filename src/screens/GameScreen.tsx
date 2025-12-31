import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGameState } from '../hooks/useGameState';
import { PeekCard } from '../components/PeekCard';

export const GameScreen: React.FC = () => {
  const {
    gameState,
    initializeGame,
    markCurrentPlayerAsViewed,
    proceedToNextPlayer,
    resetGame,
    getCurrentPlayer,
  } = useGameState();

  const [numberOfPlayers, setNumberOfPlayers] = useState('4');

  const handleStartGame = () => {
    const count = parseInt(numberOfPlayers, 10);
    if (count >= 3 && count <= 10) {
      initializeGame(count);
    }
  };

  const handlePeekComplete = () => {
    markCurrentPlayerAsViewed();
    proceedToNextPlayer();
  };

  // Setup Phase
  if (gameState.gamePhase === 'setup') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.setupContainer}>
          <Text style={styles.title}>IMPOSTER</Text>
          <Text style={styles.subtitle}>Social Hidden-Identity Game</Text>

          <View style={styles.setupCard}>
            <Text style={styles.label}>Number of Players (3-10)</Text>
            <TextInput
              style={styles.input}
              value={numberOfPlayers}
              onChangeText={setNumberOfPlayers}
              keyboardType="number-pad"
              maxLength={2}
              placeholderTextColor="#666"
            />

            <Pressable style={styles.startButton} onPress={handleStartGame}>
              <Text style={styles.startButtonText}>Start Game</Text>
            </Pressable>
          </View>

          <View style={styles.rulesContainer}>
            <Text style={styles.rulesTitle}>How to Play:</Text>
            <Text style={styles.rulesText}>
              • One player is randomly assigned as the Imposter{'\n'}
              • Others are Civilians who receive a secret word{'\n'}
              • Pass the device and peek at your role{'\n'}
              • Discuss and find the Imposter!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Passing Phase - Players peek at their roles
  if (gameState.gamePhase === 'passing') {
    const currentPlayer = getCurrentPlayer();

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.passingHeader}>
          <Text style={styles.playerName}>{currentPlayer.name}</Text>
          <Text style={styles.playerInstruction}>
            {currentPlayer.hasSeenRole
              ? 'Ready to pass to the next player'
              : "It's your turn to peek!"}
          </Text>
        </View>

        <PeekCard
          player={currentPlayer}
          secretWord={gameState.secretWord}
          onPeekComplete={handlePeekComplete}
        />
      </SafeAreaView>
    );
  }

  // Playing Phase - Game has started
  if (gameState.gamePhase === 'playing') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.playingContainer}>
          <Text style={styles.title}>Game Started!</Text>
          <Text style={styles.playingText}>
            All players have seen their roles.
          </Text>
          <Text style={styles.playingText}>
            Start discussing and find the Imposter!
          </Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Game Summary</Text>
            <Text style={styles.summaryText}>
              Total Players: {gameState.players.length}
            </Text>
            <Text style={styles.summaryText}>
              Imposters: 1 • Civilians: {gameState.players.length - 1}
            </Text>
          </View>

          <Pressable style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>New Game</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2238',
  },
  setupContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 60,
    opacity: 0.8,
  },
  setupCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 32,
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  startButton: {
    backgroundColor: '#FFD700',
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A2238',
  },
  rulesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  rulesText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.9,
  },
  passingHeader: {
    padding: 24,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  playerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 8,
  },
  playerInstruction: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  playingContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  playingText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 32,
    marginTop: 40,
    marginBottom: 40,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: '#FFD700',
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A2238',
  },
});
