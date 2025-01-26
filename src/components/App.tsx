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
import { allThemes } from '../utils/themes.ts'
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
  const setCurrentQuestionIndex = useSetAtom(currentQuestionAtom)
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)

  const startGame = (selectedDifficulty: Difficulty) => {
    console.log(`Starting game with difficulty: ${selectedDifficulty}`)

    // Configure game based on difficulty
    let numQuestions = 10
    let timePerQuestion = 30

    if (selectedDifficulty === Difficulty.EASY) {
      numQuestions = 2
      timePerQuestion = 45
    } else if (selectedDifficulty === Difficulty.MEDIUM) {
      numQuestions = 10
      timePerQuestion = 30
    } else if (selectedDifficulty === Difficulty.HARD) {
      numQuestions = 15
      timePerQuestion = 20
    }

    // Update the state atoms
    setQuestions(generateGame({ size: numQuestions }))
    setCurrentQuestionIndex(0)
    setDuration(timePerQuestion)
    setAnswerTimes([]) // Reset the answer times
    setDifficulty(selectedDifficulty) // Set the selected difficulty

    // Move to the game phase
    setGamePhase(GamePhase.GAME)
  }

  const finishGame = () => {
    setGamePhase(GamePhase.SUMMARY) // Move to the summary phase
  }

  const resetGame = () => {
    setQuestions([])
    setDifficulty(null) // Clear the difficulty
    setAnswerTimes([]) // Reset the answer times
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
          />
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
