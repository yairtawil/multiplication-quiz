import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid2,
  Typography,
  Paper,
  LinearProgress,
} from '@mui/material'
import styles from './Question.module.scss'
import { useAtom, useAtomValue } from 'jotai/index'
import { currentQuestionAtom, questionsAtom } from '../../state/game.ts'

const Question: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string>('') // "correct" or "wrong"
  const [timer, setTimer] = useState<number>(30) // Countdown timer
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useAtom(currentQuestionAtom)

  const questions = useAtomValue(questionsAtom)
  const currentQuestion = questions[currentQuestionIndex]!

  // Handle answer selection
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)

    if (answer === currentQuestion.correctAnswer) {
      setFeedback('correct')
      // Move to the next question with animation after 1 second
      setTimeout(() => {
        setIsTransitioning(true) // Start transition
        setTimeout(() => {
          setCurrentQuestionIndex(
            (prevIndex) => (prevIndex + 1) % questions.length,
          ) // Move to next question
          setFeedback('')
          setSelectedAnswer(null)
          setIsTransitioning(false) // Reset transition
          setTimer(30) // Reset timer for the next question
        }, 500) // Wait for transition animation to complete
      }, 1000)
    } else {
      setFeedback('wrong')
      // Reset feedback after 1 second
      setTimeout(() => {
        setSelectedAnswer(null)
        setFeedback('')
      }, 1000)
    }
  }

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown) // Cleanup timeout
    }
  }, [timer])

  // Calculate the progress (percentage of questions answered)
  const progress = (currentQuestionIndex / questions.length) * 100

  return (
    <Box className={styles.gameContainer}>
      <Paper
        elevation={4}
        color="secondary"
        className={`${styles.questionCard} ${
          isTransitioning ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <Typography variant="h3" className={styles.questionText}>
          {currentQuestion.text}
        </Typography>
      </Paper>

      {/* Answer Buttons */}
      <Grid2
        container
        spacing={5}
        className={`${styles.answersGrid2} ${
          isTransitioning ? styles.fadeOut : styles.fadeIn
        }`}
      >
        {currentQuestion.answers.map((answer, index) => (
          <Box sx={{ flex: '1 1 33%' }} key={index}>
            <Button
              variant="contained"
              className={`${styles.answerBtn} ${
                feedback === 'correct' && selectedAnswer === answer
                  ? styles.correct
                  : feedback === 'wrong' && selectedAnswer === answer
                    ? styles.wrong
                    : ''
              }`}
              onClick={() => handleAnswerClick(answer)}
              disabled={feedback !== '' || timer === 0} // Disable buttons if time's up
            >
              {answer}
            </Button>
          </Box>
        ))}
      </Grid2>

      {/* Footer */}
      <Box className={`${styles.footer} ${styles.fadeIn}`}>
        <Typography variant="subtitle1" className={styles.score}>
          🎯 Score: <span>{currentQuestionIndex * 10}</span>
        </Typography>

        <Box
          sx={{
            position: 'relative',
            flex: 1,
            marginBottom: 4,
            marginTop: 4,
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ backgroundColor: 'text.primary' }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            {currentQuestionIndex + 1} / {questions.length}
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          className={`${styles.timer} ${styles.pulse}`}
        >
          🕒 Timer: <span>{timer}s</span>
        </Typography>
      </Box>
    </Box>
  )
}

export default Question
