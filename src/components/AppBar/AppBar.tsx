import React from 'react'

import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Slider,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import { VolumeDown, VolumeUp } from '@mui/icons-material'
import { useSetAtom } from 'jotai'
import { themeAtom } from '../../state/ui.ts'
import { ThemeKey } from '../../types/ui.ts'

const SearchAppBar: React.FC = () => {
  const theme = useTheme()
  const setThemeKey = useSetAtom(themeAtom)

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              textAlign: 'left',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            🌸 Multiplication Quiz 🌸
          </Typography>

          {/* Volume Control */}
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: 'center', width: 250, mr: 2 }}
          >
            <VolumeDown />
            <Slider aria-label="Volume" />
            <VolumeUp />
          </Stack>

          {/* Theme Selector Button Group */}
          <ButtonGroup
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              onClick={() => setThemeKey(ThemeKey.boys)}
              sx={{
                color: '#1E88E5', // Boys theme color
                borderColor: '#1E88E5',
                '&:hover': { backgroundColor: 'rgba(30, 136, 229, 0.1)' },
              }}
            >
              Boys
            </Button>
            <Button
              onClick={() => setThemeKey(ThemeKey.girls)}
              sx={{
                color: '#EC407A', // Girls theme color
                borderColor: '#EC407A',
                '&:hover': { backgroundColor: 'rgba(236, 64, 122, 0.1)' },
              }}
            >
              Girls
            </Button>
            <Button
              onClick={() => setThemeKey(ThemeKey.dark)}
              sx={{
                color: '#424242', // Dark theme color
                borderColor: '#424242',
                '&:hover': { backgroundColor: 'rgba(66, 66, 66, 0.1)' },
              }}
            >
              Dark
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SearchAppBar
