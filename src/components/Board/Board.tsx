import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {
  currentQuestionAtom,
  durationAtom,
  questionsAtom,
} from '../../state/game.ts'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'

const Board = () => {
  const [clickResult, setClickResult] = useState(-1)
  const duration = useAtomValue(durationAtom)
  const questions = useAtomValue(questionsAtom)
  const [currentQuestion, setCurrentQuestion] = useAtom(currentQuestionAtom)

  const question = questions[currentQuestion]!

  const onClickAnswer = (answer: string, answerIndex: number) => () => {
    setClickResult(answerIndex)

    setTimeout(() => {
      setClickResult(-1)

      if (answer === question.correctAnswer) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        console.log('game over')
      }
    }, 1000)
  }
  console.log('q', questions)
  return (
    <Box
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <LinearProgress variant="determinate" value={50} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CountdownCircleTimer
          isPlaying
          key={currentQuestion.toString()}
          size={100}
          duration={duration}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[30, 20, 10, 0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </Box>

      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <Typography variant="h4" component="h2">
          {question.text}
        </Typography>

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            maxWidth: 700,
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {question.answers.map((answer, answerIndex) => (
            <Button
              sx={(theme) => ({
                width: 300,
                height: 50,
              })}
              color={
                clickResult === answerIndex
                  ? answer === question.correctAnswer
                    ? 'success'
                    : 'error'
                  : 'info'
              }
              variant="contained"
              key={answer}
              onClick={onClickAnswer(answer, answerIndex)}
            >
              {answer}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Board

//
// clickResult === answerIndex && answer === question.correctAnswer
//     ? 'primary'
//     : 'secondary'
