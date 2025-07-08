import { green } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';

export const seconBackground: SxProps<Theme> = {
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
  boxShadow: '0 -1px 8px 0px rgba(0,0,0,0.3)',
};
export const backgroundLinear: SxProps<Theme> = {
  background: `linear-gradient(to bottom, ${green.A700} 5%, ${green.A200} 40%, #ffffff 100%)`,
};
export const buttonBgLinear: SxProps<Theme> = {
  textShadow: '0 0px 8px 0px rgba(0,0,0,0.3)',
  background: `linear-gradient(to left, #6FD195 0%, #55C4AE 100%)`,
};
