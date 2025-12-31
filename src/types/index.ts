export type PlayerRole = 'Imposter' | 'Civilian';

export interface Player {
  id: number;
  name: string;
  assignedRole: PlayerRole;
  hasSeenRole: boolean;
}

export type GamePhase = 'setup' | 'passing' | 'playing';

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  secretWord: string;
  gamePhase: GamePhase;
}
