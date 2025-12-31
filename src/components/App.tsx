import React from 'react'
import AppBar from './AppBar.tsx'
import { Box, ThemeProvider } from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  answerTimesAtom,
  currentQuestionAtom,
  difficultyAtom,
  durationAtom,
  gamePhaseAtom,
  questionsAtom,
} from '../state/game.ts'
import { Difficulty, GamePhase } from '../types'
import GameMenu from './GameMenu.tsx'
import { themeAtom } from '../state/ui.ts'
import { allThemes } from '../constants/themes.ts'
import { generateGame } from '../utils'
import Game from './Game.tsx'
import SummaryPage from './SummaryPage.tsx'

function App() {
  const setDifficulty = useSetAtom(difficultyAtom)
  const themeKey = useAtomValue(themeAtom)
  const setQuestions = useAtom(questionsAtom)[1]
  const setDuration = useAtom(durationAtom)[1]
  const setAnswerTimes = useAtom(answerTimesAtom)[1]
  const answerTimes = useAtomValue(answerTimesAtom)
  const questions = useAtomValue(questionsAtom)
  const currentQuestionIndex = useAtomValue(currentQuestionAtom)
  const setCurrentQuestionIndex = useSetAtom(currentQuestionAtom)
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [isGameOver, setIsGameOver] = React.useState(false)

  const startGame = (selectedDifficulty: Difficulty) => {
    console.log(`Starting game with difficulty: ${selectedDifficulty}`)

    // Configure game based on difficulty
    let numQuestions = 10
    let timePerQuestion = 30
    let maxNumber = 10

    if (selectedDifficulty === Difficulty.SUPER_EASY) {
      numQuestions = 5
      timePerQuestion = 60
      maxNumber = 5 // Numbers from 1-5 (e.g., 2×4, 3×5)
    } else if (selectedDifficulty === Difficulty.EASY) {
      numQuestions = 10
      timePerQuestion = 50
      maxNumber = 6 // Numbers from 1-6 (e.g., 4×6, 5×3)
    } else if (selectedDifficulty === Difficulty.MEDIUM) {
      numQuestions = 15
      timePerQuestion = 30
      maxNumber = 9 // Numbers from 1-9
    } else if (selectedDifficulty === Difficulty.HARD) {
      numQuestions = 15
      timePerQuestion = 15
      maxNumber = 12 // Numbers from 1-12
    } else if (selectedDifficulty === Difficulty.SUPER_HARD) {
      numQuestions = 20
      timePerQuestion = 8
      maxNumber = 15 // Numbers from 1-15
    }

    // Update the state atoms
    setQuestions(generateGame({ size: numQuestions, maxNumber }))
    setCurrentQuestionIndex(0)
    setDuration(timePerQuestion)
    setAnswerTimes([]) // Reset the answer times
    setDifficulty(selectedDifficulty) // Set the selected difficulty

    // Move to the game phase
    setGamePhase(GamePhase.GAME)
  }

  const finishGame = () => {
    // Check if player completed all questions or time ran out
    const completedAllQuestions = currentQuestionIndex + 1 >= questions.length
    setIsGameOver(!completedAllQuestions)
    setGamePhase(GamePhase.SUMMARY) // Move to the summary phase
  }

  const resetGame = () => {
    setQuestions([])
    setDifficulty(null) // Clear the difficulty
    setAnswerTimes([]) // Reset the answer times
    setIsGameOver(false) // Reset game over state
    setGamePhase(GamePhase.MENU) // Move back to the menu
  }

  return (
    <ThemeProvider theme={allThemes[themeKey]}>
      <Box
        sx={(theme) => ({
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: theme.typography.fontFamily,
        })}
      >
        <AppBar />

        {gamePhase === GamePhase.MENU && <GameMenu onStartGame={startGame} />}
        {gamePhase === GamePhase.GAME && <Game onGameComplete={finishGame} />}
        {gamePhase === GamePhase.SUMMARY && (
          <SummaryPage
            totalTimeElapsed={answerTimes.reduce((a, b) => a + b, 0)}
            onRestart={resetGame}
            isGameOver={isGameOver}
          />
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
