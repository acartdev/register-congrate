'use client';
import { ModalAction } from '@/model/unity.model';
import { Alert, Snackbar, useMediaQuery } from '@mui/material';

export default function SnackBarComponent({
  title,
  status,
  open,
  onClose,
}: ModalAction) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Snackbar
      anchorOrigin={{
        vertical: isMobile ? 'bottom' : 'top',
        horizontal: isMobile ? 'left' : 'center',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={status}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {title}
      </Alert>
    </Snackbar>
  );
}
