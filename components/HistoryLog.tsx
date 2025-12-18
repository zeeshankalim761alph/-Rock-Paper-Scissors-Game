import React from 'react';
import { HistoryItem, GameResult } from '../types';
import { MOVE_CONFIG } from '../constants';

interface HistoryLogProps {
  history: HistoryItem[];
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ history }) => {
  // Show only last 5 entries
  const recentHistory = [...history].reverse().slice(0, 5);

  return (
    <div className="w-full max-w-md mt-6">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3 text-center">
        Recent Rounds
      </h3>
      <div className="flex flex-col gap-2">
        {recentHistory.map((item, index) => {
          let resultColor = 'bg-slate-800';
          if (item.result === GameResult.WIN) resultColor = 'bg-emerald-900/30 border-emerald-900/50';
          if (item.result === GameResult.LOSE) resultColor = 'bg-rose-900/30 border-rose-900/50';

          return (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg border border-slate-700/50 ${resultColor}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">YOU:</span>
                <span className="text-sm font-bold text-slate-200">{MOVE_CONFIG[item.playerMove].label}</span>
              </div>
              
              <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${
                item.result === GameResult.WIN ? 'bg-emerald-500/20 text-emerald-400' :
                item.result === GameResult.LOSE ? 'bg-rose-500/20 text-rose-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {item.result}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">{MOVE_CONFIG[item.computerMove].label}</span>
                <span className="text-xs text-slate-400 font-medium">:CPU</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};