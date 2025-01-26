import { Box, LinearProgress, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useAtomValue } from 'jotai/index'
import { currentQuestionAtom, questionsAtom } from '../state/game.ts'
import { useAtom } from 'jotai'

const Footer = ({
  timer,
  setTimer,
}: {
  timer: number
  setTimer: Dispatch<SetStateAction<number>>
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useAtom(currentQuestionAtom)
  const questions = useAtomValue(questionsAtom)
  const progress = (currentQuestionIndex / questions.length) * 100

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => {
        clearTimeout(countdown)
        // setCurrentQuestionIndex((prev) => (prev + 1) % questions.length)
      } // Cleanup timeout
    }
  }, [timer])

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        paddingX: 2,
        width: '100%',
        maxWidth: '500px',
        borderTop: (theme) => `2px solid ${theme.palette.divider}`,
        paddingTop: 3,
      }}
    >
      {/* Progress Bar */}
      <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 'bold',
            color: (theme) => theme.palette.text.primary,
            marginBottom: 1,
          }}
        >
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: (theme) => theme.palette.grey[300],
            '& .MuiLinearProgress-bar': {
              backgroundColor: (theme) => theme.palette.primary.main,
            },
          }}
        />
      </Box>

      {/* Timer */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (theme) => theme.palette.secondary.main,
          paddingX: 2,
          paddingY: 1,
          borderRadius: 2,
          boxShadow: (theme) => `0 2px 4px ${theme.palette.grey[400]}`,
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          minWidth: '120px',
        }}
      >
        🕒 {timer}s
      </Box>
    </Box>
  )
}

export default Footer
