import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { questionsAtom, answerTimesAtom } from '../state/game.ts'

interface SummaryPageProps {
  totalTimeElapsed: number
  onRestart: () => void // Callback to restart the game
  isGameOver?: boolean // True if time ran out, false if completed successfully
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  totalTimeElapsed,
  onRestart,
  isGameOver = false,
}) => {
  const questions = useAtomValue(questionsAtom)
  const answerTimes = useAtomValue(answerTimesAtom)

  const completedQuestions = answerTimes.length
  const totalQuestions = questions.length

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}
      >
        {isGameOver ? '⏰ Game Over! ⏰' : '🎉 Quiz Complete! 🎉'}
      </Typography>

      {isGameOver && (
        <Typography
          variant="h6"
          sx={{
            marginBottom: 3,
            textAlign: 'center',
            color: (theme) => theme.palette.error.main,
          }}
        >
          Time's Up! You completed {completedQuestions} out of {totalQuestions}{' '}
          questions.
        </Typography>
      )}

      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {isGameOver
            ? `Questions Answered: ${completedQuestions} / ${totalQuestions}`
            : `Total Time: ${totalTimeElapsed}s`}
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Question</TableCell>
              <TableCell align="center">Time (s)</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.slice(0, completedQuestions).map((question, index) => (
              <TableRow key={index}>
                <TableCell align="center">{question.text}</TableCell>
                <TableCell align="center">
                  {answerTimes[index] !== undefined
                    ? `${answerTimes[index]}s`
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {answerTimes[index] !== undefined ? '✅' : '⏱️'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={onRestart}
        sx={{ marginTop: 3, paddingX: 4, paddingY: 1.5, fontSize: '1.1rem' }}
      >
        Play Again
      </Button>
    </Box>
  )
}

export default SummaryPage
