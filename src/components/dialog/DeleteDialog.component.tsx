import { ModalAction } from '@/model/unity.model';
import {
  Dialog,
  Container,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteUser } from '@/hook/user.hook';
import LoadingComponent from '../Loading.component';
export default function DeleteDialog({ open, onClose, user }: ModalAction) {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const onSubmit = () => {
    if (user?.uuid) {
      deleteUser(user.uuid, {
        onSuccess: () => {
          onClose(true);
        },
      });
    } else {
      onClose(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <LoadingComponent open={isPending} />
      <Container sx={{ padding: 2, width: '80vw' }}>
        <Typography fontSize={20}>
          ยืนยันการลบ <DeleteIcon fontSize='medium' color='error' />
        </Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <Typography sx={{ marginBottom: 1 }} color='textSecondary'>
          คุณต้องการลบผู้ใช้ {user?.firstName + ' ' + user?.lastName} หรือไม่?
        </Typography>

        <Box
          sx={{ marginTop: 2 }}
          display={'flex'}
          gap={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClose(true);
            }}
            sx={{
              width: '100%',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 1.3,
              color: 'error.A200',
            }}
            color='error'
            variant='outlined'
          >
            ยกเลิก
          </Button>
          <Button
            sx={{
              width: '100%',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 1.3,
              color: 'white',
            }}
            color='error'
            onClick={onSubmit}
            variant='contained'
          >
            ยืนยัน
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
}
