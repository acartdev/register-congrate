'use client';
import { createTheme } from '@mui/material';
import { blue, green, grey, red, yellow } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-kanit)',
  },
  palette: {
    mode: 'light',
    background: {
      default: 'l',
    },
    primary: green,
    secondary: {
      main: '#3e4850',
    },
    warning: yellow,
    info: blue,
    error: red,
    grey: grey,
  },
});

export default theme;
