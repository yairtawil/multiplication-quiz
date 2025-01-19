import AppBar from './AppBar/AppBar.tsx'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { orange, pink, purple } from '@mui/material/colors'
import Question from './Question/Question'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'linear-gradient(135deg, #9f008d, #555555)',
      paper: pink[900],
    },
    primary: {
      main: purple[900],
    },
    secondary: {
      main: orange[500],
    },
    grey: {
      50: '#f5f5f5',
      100: '#eeeeee',
      200: '#e0e0e0',
      300: '#bdbdbd',
      400: '#9e9e9e',
      500: '#757575',
      600: '#616161',
      700: '#424242',
    },
    text: {
      primary: pink[100],
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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

        <Question />
      </Box>
    </ThemeProvider>
  )
}

export default App
