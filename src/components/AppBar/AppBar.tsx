import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Slider, Stack } from '@mui/material'
import { VolumeDown, VolumeUp } from '@mui/icons-material'

//
// color: #d81b60;
// text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
// margin-bottom: 20px;
// font-weight: bold;
// text-align: center;

export default function SearchAppBar() {
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            sx={(theme) => ({
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: theme.palette.text.primary,
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
              fontWeight: 'bold',
              textAlign: 'left',
            })}
          >
            🌸 Multiplication Table Game 🌸
          </Typography>

          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: 'center', mb: 1, width: 250 }}
          >
            <VolumeDown />
            <Slider aria-label="Volume" />
            <VolumeUp />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
