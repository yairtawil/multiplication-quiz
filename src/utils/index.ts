import { Question } from '../types'

const shuffleArr = (array: string[]): string[] => {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

export const generateMultiplicationQuestion = (
  maxNumber: number = 10,
): Question => {
  // Generate random numbers from 1 to maxNumber (for kids, like 2×4, 3×6, etc.)
  const a = Math.floor(Math.random() * maxNumber) + 1
  const b = Math.floor(Math.random() * maxNumber) + 1
  const correctAnswer = a * b

  // Use a Set to store unique incorrect answers
  const answers = new Set<string>()
  answers.add(`${correctAnswer}`)

  while (answers.size < 4) {
    // Generate incorrect answers with appropriate variation
    const variationRange = Math.max(10, Math.floor(correctAnswer * 0.4))
    const offset = Math.floor(Math.random() * variationRange) + 1
    const incorrectAnswer =
      Math.random() > 0.5
        ? correctAnswer + offset
        : Math.max(1, correctAnswer - offset) // Ensure non-negative

    answers.add(`${incorrectAnswer}`)
  }

  return {
    text: `${a} x ${b}`,
    answers: shuffleArr([...answers]), // Convert Set to Array and shuffle
    correctAnswer: `${correctAnswer}`,
  }
}

export const generateGame = ({
  size,
  maxNumber = 10,
}: {
  size: number
  maxNumber?: number
}): Question[] => {
  return Array.from({ length: size }, () =>
    generateMultiplicationQuestion(maxNumber),
  )
}
