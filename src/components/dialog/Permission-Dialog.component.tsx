'use client';
import { useUpdateUser } from '@/hook/user.hook';
import { RegisterForm } from '@/model/form.model';
import { ModalAction } from '@/model/unity.model';
import { Permission } from '@/model/user.model';
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import LoadingComponent from '../Loading.component';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export default function PermissionDialog({ open, onClose, user }: ModalAction) {
  const { mutate, isPending } = useUpdateUser();
  const onSubmit: SubmitHandler<{ permit: Permission }> = (data) => {
    if (isValid) {
      mutate({ permit: data.permit, uuid: user?.uuid } as RegisterForm, {
        onSuccess: () => {
          onClose(true);
        },
      });
    } else {
      return;
    }
  };
  const formControl = useForm({
    defaultValues: {
      permit: Permission.VIEW,
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formControl;
  return (
    <Dialog
      open={open}
      onClose={() => onClose(undefined)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <LoadingComponent open={isPending} />
      <Container
        maxWidth='sm'
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ padding: 2, width: '80vw' }}
      >
        <Typography fontSize={20}>จัดการสิทธิ์</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <Typography sx={{ marginBottom: 1 }} color='textSecondary'>
          {user?.firstName + ' ' + user?.lastName}
        </Typography>
        <FormControl fullWidth size='small'>
          <InputLabel color='info' id='select-prefix-list'>
            สิทธิการแก้ไข
          </InputLabel>
          <Controller
            name='permit'
            control={formControl.control}
            render={({ field }) => (
              <Select
                {...field}
                color='info'
                labelId='select-prefix-list'
                id='select-prefix'
                defaultValue={Permission.VIEW}
                label='สิทธิการแก้ไข'
              >
                <MenuItem value={Permission.ADMIN}>
                  สิทธิการแก้ไขผู้ดูแลระบบ
                </MenuItem>
                <MenuItem value={Permission.STAFF_STUDENT}>
                  สิทธิการแก้ไขระดับนักศึกษา
                </MenuItem>
                <MenuItem value={Permission.STAFF_TEACHER}>
                  สิทธิการแก้ไขระดับอาจารย์
                </MenuItem>
                <MenuItem value={Permission.VIEW}>สามารถดูข้อมูลได้</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Box
          sx={{ marginTop: 2 }}
          display={'flex'}
          gap={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button
            onClick={() => onClose(undefined)}
            sx={{
              width: '100%',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 1.3,
              color: 'info',
            }}
            color='info'
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
            color='info'
            type='submit'
            variant='contained'
          >
            บันทึก
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
}
