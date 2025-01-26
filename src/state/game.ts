import { atom } from 'jotai'
import { generateGame } from '../utils'
import { Difficulty, GamePhase } from '../types'

export const questionsAtom = atom(generateGame({ size: 10 })) // Default to 10 questions
export const currentQuestionAtom = atom(0)
export const durationAtom = atom(30) // Default duration is 30 seconds
export const difficultyAtom = atom<Difficulty | null>(null)
export const answerTimesAtom = atom<number[]>([]) // Tracks the time taken for each question
export const gamePhaseAtom = atom<GamePhase>(GamePhase.MENU)
