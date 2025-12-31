import { useState, useCallback } from 'react';
import { Player, GameState, GamePhase, PlayerRole } from '../types';

const SAMPLE_WORDS = [
  'Pizza', 'Guitar', 'Ocean', 'Castle', 'Rainbow',
  'Volcano', 'Telescope', 'Penguin', 'Laptop', 'Dragon'
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    secretWord: '',
    gamePhase: 'setup',
  });

  const initializeGame = useCallback((numberOfPlayers: number) => {
    // Create players
    const players: Player[] = Array.from({ length: numberOfPlayers }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      assignedRole: 'Civilian' as PlayerRole,
      hasSeenRole: false,
    }));

    // Randomly assign one player as Imposter
    const imposterIndex = Math.floor(Math.random() * numberOfPlayers);
    players[imposterIndex].assignedRole = 'Imposter';

    // Pick a random secret word
    const secretWord = SAMPLE_WORDS[Math.floor(Math.random() * SAMPLE_WORDS.length)];

    setGameState({
      players,
      currentPlayerIndex: 0,
      secretWord,
      gamePhase: 'passing',
    });
  }, []);

  const markCurrentPlayerAsViewed = useCallback(() => {
    setGameState(prev => {
      const updatedPlayers = [...prev.players];
      updatedPlayers[prev.currentPlayerIndex].hasSeenRole = true;
      return {
        ...prev,
        players: updatedPlayers,
      };
    });
  }, []);

  const proceedToNextPlayer = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentPlayerIndex + 1;
      
      // If all players have seen their roles, move to playing phase
      if (nextIndex >= prev.players.length) {
        return {
          ...prev,
          gamePhase: 'playing',
          currentPlayerIndex: 0,
        };
      }

      return {
        ...prev,
        currentPlayerIndex: nextIndex,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      players: [],
      currentPlayerIndex: 0,
      secretWord: '',
      gamePhase: 'setup',
    });
  }, []);

  const getCurrentPlayer = useCallback(() => {
    if (gameState.players.length === 0) {
      return null;
    }
    return gameState.players[gameState.currentPlayerIndex] || null;
  }, [gameState.players, gameState.currentPlayerIndex]);

  return {
    gameState,
    initializeGame,
    markCurrentPlayerAsViewed,
    proceedToNextPlayer,
    resetGame,
    getCurrentPlayer,
  };
};
