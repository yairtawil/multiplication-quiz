import { createTheme, Theme } from '@mui/material'
import { ThemeKey } from '../types/ui'

export const colorfulTheme = createTheme({
  palette: {
    primary: { main: '#EC407A' },
    secondary: { main: '#AB47BC' },
    background: { default: '#FCE4EC', paper: '#F8BBD0' },
    text: { primary: '#880E4F', secondary: '#4A148C' },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Arial", sans-serif',
  },
})

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#81D4FA' },
    secondary: { main: '#F48FB1' },
    background: { default: '#212121', paper: '#424242' },
    text: { primary: '#E3F2FD', secondary: '#BBDEFB' },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Arial", sans-serif',
  },
})

export const lightTheme = createTheme({
  palette: {
    primary: { main: '#1E88E5' },
    secondary: { main: '#43A047' },
    background: { default: '#BBDEFB', paper: '#E3F2FD' },
    text: { primary: '#0D47A1', secondary: '#1B5E20' },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Arial", sans-serif',
  },
})

export const allThemes = {
  [ThemeKey.colorful]: colorfulTheme,
  [ThemeKey.dark]: darkTheme,
  [ThemeKey.light]: lightTheme,
} satisfies Record<ThemeKey, Theme>
