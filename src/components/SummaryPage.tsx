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
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  totalTimeElapsed,
  onRestart,
}) => {
  const questions = useAtomValue(questionsAtom)
  const answerTimes = useAtomValue(answerTimesAtom)

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
        🎉 Quiz Summary 🎉
      </Typography>

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
          Total Time: {totalTimeElapsed}s
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Question</TableCell>
              <TableCell align="center">Time (s)</TableCell>
              <TableCell align="center">Correct?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell align="center">{question.text}</TableCell>
                <TableCell align="center">{answerTimes[index]}s</TableCell>
                <TableCell align="center">
                  {answerTimes[index] <= 30 ? '✅' : '❌'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button variant="contained" color="primary" onClick={onRestart}>
        Restart Game
      </Button>
    </Box>
  )
}

export default SummaryPage
