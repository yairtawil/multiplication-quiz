import React, { useState } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  answerTimesAtom,
  currentQuestionAtom,
  durationAtom,
  questionsAtom,
} from '../state/game.ts'
import Footer from './Footer.tsx'

interface GameProps {
  onGameComplete: () => void // Callback for when the game is completed
}

const Game: React.FC<GameProps> = ({ onGameComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | ''>('')
  const duration = useAtomValue(durationAtom)
  const [timer, setTimer] = useState<number>(duration) // Countdown timer
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useAtom(currentQuestionAtom)
  const setAnswerTimes = useSetAtom(answerTimesAtom)
  const questionDuration = useAtomValue(durationAtom)

  // Sounds
  const correctSound = new Audio('/multiplication-quiz/sounds/correct.mp3') // Path to correct answer sound
  const wrongSound = new Audio('/multiplication-quiz/sounds/wrong.mp3') // Path to wrong answer sound

  const questions = useAtomValue(questionsAtom)
  const currentQuestion = questions[currentQuestionIndex]!

  // Handle answer selection
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
    const timeTakenForQuestion = questionDuration - timer
    setAnswerTimes((prev) => [...prev, timeTakenForQuestion])

    if (answer === currentQuestion.correctAnswer) {
      setFeedback('correct')
      correctSound.play() // Play correct answer sound

      // Move to the next question with animation after 1 second
      setTimeout(() => {
        setIsTransitioning(true) // Start transition
        setTimeout(() => {
          if (currentQuestionIndex + 1 >= questions.length) {
            onGameComplete() // Game is complete
            return
          }

          setCurrentQuestionIndex(
            (prevIndex) => (prevIndex + 1) % questions.length,
          ) // Move to next question
          setFeedback('')
          setSelectedAnswer(null)
          setIsTransitioning(false) // Reset transition
          setTimer(duration) // Reset timer for the next question
        }, 500) // Wait for transition animation to complete
      }, 1000)
    } else {
      setFeedback('wrong')
      wrongSound.play()
      // Reset feedback after 1 second
      setTimeout(() => {
        setSelectedAnswer(null)
        setFeedback('')
      }, 1000)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 4,
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      {/* Question Card */}
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          marginBottom: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          animation: isTransitioning
            ? 'fadeOut 0.5s ease-in'
            : 'fadeIn 0.8s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes fadeOut': {
            from: { opacity: 1, transform: 'translateY(0)' },
            to: { opacity: 0, transform: 'translateY(20px)' },
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {currentQuestion.text}
        </Typography>
      </Paper>

      {/* Answer Buttons */}
      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: '600px',
          animation: isTransitioning
            ? 'fadeOut 0.5s ease-in'
            : 'fadeIn 0.8s ease-out',
        }}
      >
        {currentQuestion.answers.map((answer, index) => {
          const isCorrect = feedback === 'correct' && selectedAnswer === answer
          const isWrong = feedback === 'wrong' && selectedAnswer === answer
          const isDisabled = feedback !== '' || timer === 0

          return (
            <Grid item xs={6} key={index}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => handleAnswerClick(answer)}
                disabled={isDisabled} // Disable buttons if feedback exists or timer is up
                sx={{
                  padding: 2,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  animation: isCorrect
                    ? 'sparkle 1s linear'
                    : isWrong
                      ? 'shake 0.5s ease-in-out'
                      : '',
                  backgroundColor: isCorrect
                    ? 'success.main'
                    : isWrong
                      ? 'error.main'
                      : 'primary.main',
                  color: 'white',
                  opacity: isDisabled && !isCorrect && !isWrong ? 0.7 : 1, // Slight opacity for general disabled buttons
                  '&.Mui-disabled': {
                    backgroundColor: isCorrect
                      ? 'success.main'
                      : isWrong
                        ? 'error.main'
                        : 'primary.main',
                    color: 'white', // Ensure the text remains visible
                  },
                  '&:hover': {
                    backgroundColor: isCorrect
                      ? 'success.dark'
                      : isWrong
                        ? 'error.dark'
                        : 'primary.dark',
                  },
                  '@keyframes shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%, 75%': { transform: 'translateX(-10px)' },
                    '50%': { transform: 'translateX(10px)' },
                  },
                  '@keyframes sparkle': {
                    '0%': {
                      boxShadow:
                        '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 255, 0, 0.5)',
                    },
                    '50%': {
                      boxShadow:
                        '0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(0, 255, 0, 0.8)',
                    },
                    '100%': {
                      boxShadow:
                        '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 255, 0, 0.5)',
                    },
                  },
                }}
              >
                {answer}
              </Button>
            </Grid>
          )
        })}
      </Grid>

      {/* Footer */}
      <Footer timer={timer} setTimer={setTimer} />
    </Box>
  )
}

export default Game
