export enum Move {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSORS = 'SCISSORS',
}

export enum GameResult {
  WIN = 'WIN',
  LOSE = 'LOSE',
  DRAW = 'DRAW',
}

export enum GameMode {
  EASY = 'EASY',
  HARD = 'HARD',
}

export interface HistoryItem {
  playerMove: Move;
  computerMove: Move;
  result: GameResult;
}

export interface GameState {
  playerScore: number;
  computerScore: number;
  history: HistoryItem[];
}