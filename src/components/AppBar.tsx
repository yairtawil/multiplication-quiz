import React from 'react'

import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Slider,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import {
  VolumeDown,
  VolumeUp,
  VolumeOff,
  RestartAlt,
} from '@mui/icons-material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { themeAtom, volumeAtom } from '../state/ui.ts'
import { ThemeKey } from '../types/ui.ts'
import {
  answerTimesAtom,
  currentQuestionAtom,
  difficultyAtom,
  gamePhaseAtom,
  questionsAtom,
} from '../state/game.ts'
import { GamePhase } from '../types/game.ts'

const SearchAppBar: React.FC = () => {
  const theme = useTheme()
  const setThemeKey = useSetAtom(themeAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const setGamePhase = useSetAtom(gamePhaseAtom)
  const setQuestions = useSetAtom(questionsAtom)
  const setDifficulty = useSetAtom(difficultyAtom)
  const setAnswerTimes = useSetAtom(answerTimesAtom)
  const setCurrentQuestionIndex = useSetAtom(currentQuestionAtom)
  const [volume, setVolume] = useAtom(volumeAtom)

  const handleRestartGame = () => {
    setQuestions([])
    setDifficulty(null)
    setAnswerTimes([])
    setCurrentQuestionIndex(0)
    setGamePhase(GamePhase.MENU)
  }

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              textAlign: 'left',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            🌸 Multiplication Quiz 🌸
          </Typography>

          {/* Restart Game Button - Only show when game is active */}
          {gamePhase === GamePhase.GAME && (
            <Button
              variant="contained"
              color="warning"
              startIcon={<RestartAlt />}
              onClick={handleRestartGame}
              sx={{ mr: 2 }}
            >
              Restart Game
            </Button>
          )}

          {/* Volume Control */}
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: 'center', width: 250, mr: 2 }}
          >
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={100}
            />
            {volume === 0 ? <VolumeOff /> : <VolumeUp />}
          </Stack>

          {/* Theme Selector Button Group */}
          <ButtonGroup variant="outlined">
            <Button onClick={() => setThemeKey(ThemeKey.colorful)}>
              Colorful
            </Button>
            <Button onClick={() => setThemeKey(ThemeKey.light)}>Light</Button>
            <Button onClick={() => setThemeKey(ThemeKey.dark)}>Dark</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SearchAppBar
