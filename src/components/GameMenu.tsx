import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Difficulty } from '../types'

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
          maxWidth: '400px',
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => onStartGame(Difficulty.SUPER_EASY)}
          sx={{ fontWeight: 'bold' }}
        >
          Super Easy
          <Typography variant="caption" sx={{ ml: 2, opacity: 0.8 }}>
            (1-5, 5 questions, 60s)
          </Typography>
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => onStartGame(Difficulty.EASY)}
          sx={{ fontWeight: 'bold' }}
        >
          Easy
          <Typography variant="caption" sx={{ ml: 2, opacity: 0.8 }}>
            (1-6, 10 questions, 50s)
          </Typography>
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => onStartGame(Difficulty.MEDIUM)}
          sx={{ fontWeight: 'bold' }}
        >
          Medium
          <Typography variant="caption" sx={{ ml: 2, opacity: 0.8 }}>
            (1-9, 15 questions, 30s)
          </Typography>
        </Button>
        <Button
          variant="contained"
          size="large"
          color="warning"
          onClick={() => onStartGame(Difficulty.HARD)}
          sx={{ fontWeight: 'bold' }}
        >
          Hard
          <Typography variant="caption" sx={{ ml: 2, opacity: 0.8 }}>
            (1-12, 15 questions, 15s)
          </Typography>
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={() => onStartGame(Difficulty.SUPER_HARD)}
          sx={{ fontWeight: 'bold' }}
        >
          Super Hard
          <Typography variant="caption" sx={{ ml: 2, opacity: 0.8 }}>
            (1-15, 20 questions, 8s)
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default GameMenu
