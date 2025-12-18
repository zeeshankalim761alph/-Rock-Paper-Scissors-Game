import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, Move, GameResult, GameState } from './types';
import { getComputerMove } from './utils/gameLogic';
import { playSound, SoundType } from './services/soundService';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { HistoryLog } from './components/HistoryLog';

const INITIAL_STATE: GameState = {
  playerScore: 0,
  computerScore: 0,
  history: [],
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [currentResult, setCurrentResult] = useState<{
    playerMove: Move;
    computerMove: Move;
    result: GameResult;
  } | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.EASY);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize audio context on first interaction to comply with browser policies
  useEffect(() => {
    const initAudio = () => {
      // Just a dummy call to ensure context is resumed if created
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio);
    return () => document.removeEventListener('click', initAudio);
  }, []);

  const resetGame = () => {
    playSound(SoundType.CLICK);
    setGameState(INITIAL_STATE);
    setCurrentResult(null);
  };

  const handlePlayerChoice = useCallback((playerMove: Move) => {
    if (isAnimating) return;

    setIsAnimating(true);
    playSound(SoundType.CLICK);

    // Artificial delay for "thinking" visualization
    setTimeout(() => {
      const computerMove = getComputerMove(gameMode, gameState.history);
      
      let result = GameResult.DRAW;
      if (playerMove !== computerMove) {
        if (
          (playerMove === Move.ROCK && computerMove === Move.SCISSORS) ||
          (playerMove === Move.PAPER && computerMove === Move.ROCK) ||
          (playerMove === Move.SCISSORS && computerMove === Move.PAPER)
        ) {
          result = GameResult.WIN;
        } else {
          result = GameResult.LOSE;
        }
      }

      // Play result sound
      if (result === GameResult.WIN) playSound(SoundType.WIN);
      else if (result === GameResult.LOSE) playSound(SoundType.LOSE);
      else playSound(SoundType.DRAW);

      const newHistoryItem = { playerMove, computerMove, result };
      
      setCurrentResult({ playerMove, computerMove, result });
      
      setGameState(prev => ({
        playerScore: result === GameResult.WIN ? prev.playerScore + 1 : prev.playerScore,
        computerScore: result === GameResult.LOSE ? prev.computerScore + 1 : prev.computerScore,
        history: [...prev.history, newHistoryItem],
      }));

      setIsAnimating(false);
    }, 400); // Short delay for UX
  }, [gameMode, gameState.history, isAnimating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center py-8 px-4 font-sans text-slate-100">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <Header />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
           <ScoreBoard playerScore={gameState.playerScore} computerScore={gameState.computerScore} />
           <ModeSelector currentMode={gameMode} onSelectMode={setGameMode} />
        </div>

        <div className="min-h-[300px] flex items-center justify-center py-6">
          {currentResult ? (
            <ResultDisplay 
              result={currentResult} 
              onPlayAgain={() => {
                playSound(SoundType.CLICK);
                setCurrentResult(null);
              }} 
            />
          ) : (
            <GameControls onSelect={handlePlayerChoice} disabled={isAnimating} />
          )}
        </div>

        {gameState.history.length > 0 && (
          <HistoryLog history={gameState.history} />
        )}

        <button 
          onClick={resetGame}
          className="mt-4 px-6 py-2 rounded-full border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 hover:bg-slate-800 transition-all text-sm font-medium self-center"
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
}