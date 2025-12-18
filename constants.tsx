import React from 'react';
import { Move } from './types';
import { Hand, Scissors, Scroll } from 'lucide-react';

export const MOVE_CONFIG = {
  [Move.ROCK]: {
    icon: <Hand className="w-full h-full rotate-90" />, // Simulating a fist/rock
    label: 'Rock',
    color: 'bg-red-500',
    hover: 'hover:bg-red-600',
    ring: 'ring-red-400',
  },
  [Move.PAPER]: {
    icon: <Scroll className="w-full h-full" />,
    label: 'Paper',
    color: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    ring: 'ring-blue-400',
  },
  [Move.SCISSORS]: {
    icon: <Scissors className="w-full h-full" />,
    label: 'Scissors',
    color: 'bg-yellow-500',
    hover: 'hover:bg-yellow-600',
    ring: 'ring-yellow-400',
  },
};