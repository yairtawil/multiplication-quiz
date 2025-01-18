import { Question } from '../types'

const shuffleArr = (array: string[]): string[] => {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

export const generateMultiplicationTableQuestion = (): Question => {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1

  let length = 1
  const answers: string[] = []

  answers[0] = `${a * b}`

  while (length < 4) {
    const answerPlus = `${a * b + Math.floor(Math.random() * 10)}`
    const answerMinus = `${a * b - Math.floor(Math.random() * 10)}`
    const answer = Math.random() > 0.5 ? answerPlus : answerMinus

    if (!answers.includes(answer)) {
      answers[length] = answer
      length++
    }
  }

  return {
    text: `${a} x ${b}`,
    answers: shuffleArr(answers),
    correctAnswer: `${a * b}`,
  }
}

export const generateGame = ({ size }: { size: number }): Question[] => {
  // need uniq questions

  return Array.from({ length: size }, () =>
    generateMultiplicationTableQuestion(),
  )
}
