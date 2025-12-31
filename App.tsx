import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SetupScreen from './src/screens/SetupScreen';
import GameScreen from './src/screens/GameScreen';
import { initializeGame, GameState } from './src/logic/gameLogic';

type AppScreen = 'setup' | 'game';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('setup');
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleStartGame = (playerCount: number, spyCount: number) => {
    const newGameState = initializeGame(playerCount, spyCount);
    setGameState(newGameState);
    setCurrentScreen('game');
  };

  const handleNextPlayer = (newState: GameState) => {
    setGameState(newState);
  };

  const handleRestart = () => {
    setGameState(null);
    setCurrentScreen('setup');
  };

  return (
    <>
      <StatusBar style="light" />
      {currentScreen === 'setup' && (
        <SetupScreen onStartGame={handleStartGame} />
      )}
      {currentScreen === 'game' && gameState && (
        <GameScreen
          gameState={gameState}
          onNextPlayer={handleNextPlayer}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
