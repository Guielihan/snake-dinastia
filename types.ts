export interface UserProfile {
  nickname: string;
  age: string;
  gender: string;
  title?: string; // AI generated title
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum GameStatus {
  IDLE = 'IDLE',
  COUNTDOWN = 'COUNTDOWN',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXTREME = 'EXTREME'
}

export interface AICommentary {
  message: string;
  mood: 'neutral' | 'happy' | 'sarcastic' | 'encouraging';
}
