import React from 'react';
import { Gamepad2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center gap-2 mb-4">
      <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-900/50">
        <Gamepad2 size={40} className="text-white" />
      </div>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        RPS Master
      </h1>
      <p className="text-slate-400 font-medium">Rock • Paper • Scissors</p>
    </header>
  );
};