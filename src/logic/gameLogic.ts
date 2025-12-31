/**
 * Game logic module for the spy game
 * Handles player role assignment and game state management
 */

export type PlayerRole = 'Normal' | 'Spy';

export interface Player {
  id: number;
  role: PlayerRole;
  word: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  totalPlayers: number;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Creates players with assigned roles
 * @param totalPlayers - Total number of players
 * @param spyCount - Number of spies (default: 1)
 * @param normalWord - Word shown to normal players (default: "Apple")
 * @returns Array of players with shuffled roles
 */
export function createPlayers(
  totalPlayers: number,
  spyCount: number = 1,
  normalWord: string = 'Apple'
): Player[] {
  if (totalPlayers < 2) {
    throw new Error('Must have at least 2 players');
  }
  if (spyCount >= totalPlayers) {
    throw new Error('Spy count must be less than total players');
  }

  // Create array of roles
  const roles: PlayerRole[] = [
    ...Array(spyCount).fill('Spy'),
    ...Array(totalPlayers - spyCount).fill('Normal'),
  ];

  // Shuffle roles
  const shuffledRoles = shuffleArray(roles);

  // Create players with assigned roles
  return shuffledRoles.map((role, index) => ({
    id: index + 1,
    role,
    word: role === 'Spy' ? 'Spy' : normalWord,
  }));
}

/**
 * Initializes game state
 */
export function initializeGame(totalPlayers: number, spyCount: number = 1): GameState {
  return {
    players: createPlayers(totalPlayers, spyCount),
    currentPlayerIndex: 0,
    totalPlayers,
  };
}

/**
 * Advances to the next player
 */
export function nextPlayer(state: GameState): GameState {
  const nextIndex = (state.currentPlayerIndex + 1) % state.totalPlayers;
  return {
    ...state,
    currentPlayerIndex: nextIndex,
  };
}

/**
 * Gets the current player
 */
export function getCurrentPlayer(state: GameState): Player {
  return state.players[state.currentPlayerIndex];
}

/**
 * Checks if the game has completed a full round
 */
export function hasCompletedRound(state: GameState): boolean {
  return state.currentPlayerIndex === 0 && state.players.length > 0;
}
