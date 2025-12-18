import React from 'react';
import { Move } from '../types';
import { MOVE_CONFIG } from '../constants';

interface GameControlsProps {
  onSelect: (move: Move) => void;
  disabled: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({ onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up">
      {(Object.keys(MOVE_CONFIG) as Move[]).map((move) => {
        const config = MOVE_CONFIG[move];
        return (
          <button
            key={move}
            onClick={() => onSelect(move)}
            disabled={disabled}
            className={`
              group relative w-32 h-32 sm:w-40 sm:h-40 rounded-full 
              border-4 border-slate-700 bg-slate-800 
              flex flex-col items-center justify-center gap-2 
              transition-all duration-300 transform 
              ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : `hover:scale-110 hover:-translate-y-2 cursor-pointer ${config.hover} hover:border-transparent active:scale-95`}
            `}
            aria-label={`Select ${config.label}`}
          >
            <div className={`w-12 h-12 sm:w-16 sm:h-16 text-slate-300 group-hover:text-white transition-colors duration-300`}>
              {config.icon}
            </div>
            <span className="font-bold text-slate-400 group-hover:text-white uppercase tracking-widest text-sm">
              {config.label}
            </span>
            
            {/* Hover Glow Effect */}
            <div className={`
              absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 
              transition-opacity duration-300 ${config.color} blur-lg -z-10
            `} />
          </button>
        );
      })}
    </div>
  );
};