import { green } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';

export const seconBackground: SxProps<Theme> = {
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
  borderBottomRightRadius: { sm: 0, md: 30 },
  borderBottomLeftRadius: { sm: 0, md: 30 },
  boxShadow: '0 -1px 8px 0px rgba(0,0,0,0.3)',
};
export const backgroundLinear: SxProps<Theme> = {
  background: `linear-gradient(to bottom, ${green.A700} 5%, ${green.A200} 40%, #ffffff 100%)`,
};
export const buttonBgLinear: SxProps<Theme> = {
  textShadow: '0 0px 8px 0px rgba(0,0,0,0.3)',
  background: `linear-gradient(to left, #6FD195 0%, #55C4AE 100%)`,
};

export const buttonBgErrorLinear: SxProps<Theme> = {
  textShadow: '0 0px 8px 0px rgba(0,0,0,0.3)',
  background: `linear-gradient(to left, #FF6B6B 0%, #FF4D4D 100%)`,
};

export const backgroundMenuLinear: SxProps<Theme> = {
  background: `linear-gradient(to top, ${green.A700} 0%, ${green.A200} 10%, #ffffff 50%)`,
};

export const navbarSyle: SxProps<Theme> = {
  width: '100%',
  height: '60px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.8em',
  alignItems: 'center',
  boxShadow: '0 4px 8px 0px rgba(0,0,0,0.3)',
};
