// themes.ts
import { createTheme } from '@mui/material/styles'

// Boys Theme
export const boysTheme = createTheme({
  palette: {
    primary: { main: '#1E88E5' }, // Blue
    secondary: { main: '#43A047' }, // Green
    background: { default: '#BBDEFB', paper: '#E3F2FD' }, // Light Blue shades
    text: { primary: '#0D47A1', secondary: '#1B5E20' }, // Dark Blue and Green
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Arial", sans-serif',
    h3: { fontWeight: 700, fontSize: '2.5rem' }, // Game title
    button: { fontWeight: 600, fontSize: '1.5rem', textTransform: 'uppercase' },
  },
})

// Girls Theme
export const girlsTheme = createTheme({
  palette: {
    primary: { main: '#EC407A' }, // Pink
    secondary: { main: '#AB47BC' }, // Purple
    background: { default: '#FCE4EC', paper: '#F8BBD0' }, // Light Pink shades
    text: { primary: '#880E4F', secondary: '#4A148C' }, // Dark Pink and Purple
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h3: { fontWeight: 700, fontSize: '2.5rem' },
    button: { fontWeight: 600, fontSize: '1.5rem', textTransform: 'uppercase' },
  },
})

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    primary: { main: '#90CAF9' }, // Light Blue
    secondary: { main: '#F48FB1' }, // Pink
    background: { default: '#212121', paper: '#424242' }, // Dark Shades
    text: { primary: '#FFFFFF', secondary: '#BDBDBD' }, // White and Gray
  },
  typography: {
    fontFamily: '"Roboto Mono", "Arial", sans-serif',
    h3: { fontWeight: 700, fontSize: '2.5rem' },
    button: { fontWeight: 600, fontSize: '1.5rem', textTransform: 'uppercase' },
  },
})

export const allThemes = {
  girls: girlsTheme,
  boys: boysTheme,
  dark: darkTheme,
}
