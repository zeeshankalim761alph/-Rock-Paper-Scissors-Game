import React from 'react';
import { User, Cpu } from 'lucide-react';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerScore, computerScore }) => {
  return (
    <div className="flex justify-center gap-6 w-full max-w-md mx-auto">
      <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider text-xs">
          <User size={16} /> Player
        </div>
        <span className="text-4xl font-black text-white">{playerScore}</span>
      </div>
      
      <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-pink-400 font-bold uppercase tracking-wider text-xs">
          <Cpu size={16} /> CPU
        </div>
        <span className="text-4xl font-black text-white">{computerScore}</span>
      </div>
    </div>
  );
};