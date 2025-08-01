import { Backdrop, CircularProgress } from '@mui/material';

export default function LoadingComponent({ open }: { open: boolean }) {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color='primary' />
    </Backdrop>
  );
}
