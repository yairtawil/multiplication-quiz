import Board from './Board/Board.tsx'
import AppBar from './AppBar/AppBar.tsx'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { orange, purple } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
    },
    primary: {
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      main: orange[500],
      dark: orange[700],
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
      primary: '#ffffff',
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
          backgroundColor: theme.palette.background.default,
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

        <Board />
      </Box>
    </ThemeProvider>
  )
}

export default App
