export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type Question = {
  text: string
  answers: string[]
  correctAnswer: string
}

export enum GamePhase {
  MENU = 'menu',
  GAME = 'game',
  SUMMARY = 'summary',
}
