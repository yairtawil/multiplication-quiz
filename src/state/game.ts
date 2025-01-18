import { atom } from 'jotai'
import { generateGame } from '../utils'

export const questionsAtom = atom(generateGame({ size: 10 }))
export const currentQuestionAtom = atom(0)
export const durationAtom = atom(30)
