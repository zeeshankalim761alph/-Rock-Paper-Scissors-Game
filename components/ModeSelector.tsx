import React from 'react';
import { GameMode } from '../types';
import { Brain, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="bg-slate-800/80 p-1.5 rounded-lg flex gap-1 border border-slate-700">
      <button
        onClick={() => onSelectMode(GameMode.EASY)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all
          ${currentMode === GameMode.EASY 
            ? 'bg-emerald-600 text-white shadow-md' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}
        `}
      >
        <Sparkles size={16} /> Easy
      </button>
      <button
        onClick={() => onSelectMode(GameMode.HARD)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all
          ${currentMode === GameMode.HARD 
            ? 'bg-rose-600 text-white shadow-md' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}
        `}
      >
        <Brain size={16} /> Hard
      </button>
    </div>
  );
};