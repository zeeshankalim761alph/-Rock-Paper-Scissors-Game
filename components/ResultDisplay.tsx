import React from 'react';
import { Move, GameResult } from '../types';
import { MOVE_CONFIG } from '../constants';
import { RotateCcw } from 'lucide-react';

interface ResultDisplayProps {
  result: {
    playerMove: Move;
    computerMove: Move;
    result: GameResult;
  };
  onPlayAgain: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onPlayAgain }) => {
  const { playerMove, computerMove, result: gameResult } = result;

  const getResultStyle = () => {
    switch (gameResult) {
      case GameResult.WIN: return 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]';
      case GameResult.LOSE: return 'text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]';
      default: return 'text-slate-200';
    }
  };

  const getMessage = () => {
    switch (gameResult) {
      case GameResult.WIN: return 'You Win!';
      case GameResult.LOSE: return 'You Lose!';
      default: return 'It\'s a Draw';
    }
  };

  const PlayerIcon = MOVE_CONFIG[playerMove].icon;
  const ComputerIcon = MOVE_CONFIG[computerMove].icon;

  return (
    <div className="flex flex-col items-center w-full animate-pop-in">
      
      {/* Result Text */}
      <h2 className={`text-5xl sm:text-6xl font-black mb-10 ${getResultStyle()} uppercase tracking-tight text-center`}>
        {getMessage()}
      </h2>

      {/* VS Display */}
      <div className="flex items-center justify-center gap-8 sm:gap-16 w-full mb-10">
        
        {/* Player Side */}
        <div className="flex flex-col items-center gap-4">
          <div className={`
            w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center
            bg-slate-800 shadow-xl relative
            ${gameResult === GameResult.WIN ? 'border-emerald-500 shadow-emerald-900/50' : 'border-slate-600'}
          `}>
             <div className="w-12 h-12 sm:w-16 sm:h-16 text-slate-200">
               {PlayerIcon}
             </div>
             {gameResult === GameResult.WIN && (
               <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                 WINNER
               </div>
             )}
          </div>
          <span className="text-slate-400 font-bold text-sm tracking-wider">YOU</span>
        </div>

        <div className="text-slate-600 font-black text-2xl italic">VS</div>

        {/* Computer Side */}
        <div className="flex flex-col items-center gap-4">
          <div className={`
            w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center
            bg-slate-800 shadow-xl relative
            ${gameResult === GameResult.LOSE ? 'border-rose-500 shadow-rose-900/50' : 'border-slate-600'}
          `}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 text-slate-200">
               {ComputerIcon}
             </div>
             {gameResult === GameResult.LOSE && (
               <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                 WINNER
               </div>
             )}
          </div>
          <span className="text-slate-400 font-bold text-sm tracking-wider">CPU</span>
        </div>

      </div>

      <button
        onClick={onPlayAgain}
        className="
          flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full 
          font-bold text-lg hover:scale-105 active:scale-95 transition-all
          shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
        "
      >
        <RotateCcw size={20} />
        Play Again
      </button>
    </div>
  );
};