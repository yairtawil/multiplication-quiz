import AppBar from './AppBar/AppBar.tsx'
import { Box, ThemeProvider } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai'
import { difficultyAtom, questionsAtom, durationAtom } from '../state/game.ts'
import { Difficulty } from '../types'
import GameMenu from './GameMenu/GameMenu.tsx'
import { themeAtom } from '../state/ui.ts'
import { allThemes } from '../utils/themes.ts'
import { generateGame } from '../utils'
import Game from './Game/Game.tsx'

function App() {
  const [difficulty, setDifficulty] = useAtom(difficultyAtom)
  const themeKey = useAtomValue(themeAtom)
  const setQuestions = useAtom(questionsAtom)[1]
  const setDuration = useAtom(durationAtom)[1]

  const startGame = (selectedDifficulty: Difficulty) => {
    console.log(`Starting game with difficulty: ${selectedDifficulty}`)

    // Configure game based on difficulty
    let numQuestions = 10
    let timePerQuestion = 30

    if (selectedDifficulty === Difficulty.EASY) {
      numQuestions = 5
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
    setDuration(timePerQuestion)
    setDifficulty(selectedDifficulty) // Set the selected difficulty
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

        {!difficulty ? <GameMenu onStartGame={startGame} /> : <Game />}
      </Box>
    </ThemeProvider>
  )
}

export default App
