import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Difficulty } from '../../types/game.ts'

interface GameMenuProps {
  onStartGame: (difficulty: Difficulty) => void
}

const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 6,
        }}
      >
        🌟 Multiplication Table Game 🌟
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => onStartGame(Difficulty.EASY)}
        >
          Easy
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => onStartGame(Difficulty.MEDIUM)}
        >
          Medium
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={() => onStartGame(Difficulty.HARD)}
        >
          Hard
        </Button>
      </Box>
    </Box>
  )
}

export default GameMenu
