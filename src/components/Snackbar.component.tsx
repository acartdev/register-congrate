import { ModalAction } from '@/model/unity.model';
import { Alert, Snackbar } from '@mui/material';

export default function SnackBarComponent({
  title,
  status,
  open,
  onClose,
}: ModalAction) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
