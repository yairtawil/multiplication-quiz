export enum Difficulty {
  SUPER_EASY = 'super_easy',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  SUPER_HARD = 'super_hard',
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
