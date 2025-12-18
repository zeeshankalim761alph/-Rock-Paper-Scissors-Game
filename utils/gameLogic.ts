import { GameMode, Move, HistoryItem } from '../types';

const MOVES = [Move.ROCK, Move.PAPER, Move.SCISSORS];

const getRandomMove = (): Move => {
  const randomIndex = Math.floor(Math.random() * MOVES.length);
  return MOVES[randomIndex];
};

/**
 * Hard Mode Logic:
 * Uses a simple Markov chain strategy.
 * It looks at the player's last move and counts what they played *after* that move in the past.
 * It predicts the player will likely repeat that pattern and chooses the counter-move.
 */
const getHardMove = (history: HistoryItem[]): Move => {
  if (history.length < 2) return getRandomMove();

  const lastMove = history[history.length - 1].playerMove;
  
  // Frequency map for the move following the 'lastMove'
  const counts = {
    [Move.ROCK]: 0,
    [Move.PAPER]: 0,
    [Move.SCISSORS]: 0,
  };

  let foundPattern = false;

  // Analyze history (excluding the very last item as it has no follower yet)
  for (let i = 0; i < history.length - 1; i++) {
    if (history[i].playerMove === lastMove) {
      const nextMove = history[i + 1].playerMove;
      counts[nextMove]++;
      foundPattern = true;
    }
  }

  if (!foundPattern) return getRandomMove();

  // Find the move the player is most likely to make next
  let predictedPlayerMove = MOVES[0];
  let maxCount = -1;

  for (const move of MOVES) {
    if (counts[move] > maxCount) {
      maxCount = counts[move];
      predictedPlayerMove = move;
    }
  }

  // Return the counter to the predicted move
  switch (predictedPlayerMove) {
    case Move.ROCK: return Move.PAPER;
    case Move.PAPER: return Move.SCISSORS;
    case Move.SCISSORS: return Move.ROCK;
  }
};

export const getComputerMove = (mode: GameMode, history: HistoryItem[]): Move => {
  if (mode === GameMode.EASY) {
    return getRandomMove();
  } else {
    return getHardMove(history);
  }
};