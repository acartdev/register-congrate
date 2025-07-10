'use client';
import RegisterFormComponent from '@/components/Register-Form.component';
import { NamePrefix, RegisterForm } from '@/model/form.model';
import { RegisterSchema } from '@/schema/form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { mockUser } from '@/data/mock';
import { useSnackStore } from '@/_store/snackStore';

export default function Homepage() {
  const [isLoad, setIsload] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { onOpenSnack, updateSnackContent } = useSnackStore();

  const formControl = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      prefix: NamePrefix.MR,
      userID: '',
      deptID: 1,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful },
  } = formControl;
  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        reset(mockUser);
        setIsload(false);
      }, 1000);
    }
    if (isSubmitSuccessful) {
      reset(watch(), {
        keepValues: true,
        keepDirty: false,
        keepDefaultValues: false,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    if (!isDirty) {
      updateSnackContent({
        status: 'warning',
        title: 'ข้อมูลยังไม่ถูกแก้ไข กรุณาตรวจสอบ',
      });
      onOpenSnack();
      return;
    }
    updateSnackContent({
      title: 'แก้ไขข้อมูลสำเร็จ',
      status: 'success',
    });
    onOpenSnack();
    setIsEdit(false);
  };
  const onResetForm = () => {
    setIsEdit(false);
    reset();
  };
  const ButtonAction = isEdit ? (
    <Box display={'flex'} alignItems={'center'} gap={1}>
      <Button
        onClick={onResetForm}
        size='small'
        disableElevation
        sx={{ color: 'primary.A700' }}
        variant='outlined'
      >
        ยกเลิก
      </Button>
      <Button
        onClick={handleSubmit(onSubmit)}
        size='small'
        disableElevation
        sx={{ bgcolor: 'primary.A700', color: 'white' }}
        variant='contained'
      >
        บึนทึก
      </Button>
    </Box>
  ) : (
    <Button
      onClick={() => setIsEdit(true)}
      size='small'
      disableElevation
      sx={{ bgcolor: 'warning.A700', color: 'grey.A700' }}
      variant='contained'
    >
      แก้ไข
    </Button>
  );
  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography fontSize={18}>ข้อมูลส่วนตัว</Typography>
        {ButtonAction}
      </Box>
      <Divider sx={{ marginY: 1.5 }} />
      <Stack marginTop={4}>
        {isLoad ? (
          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoad}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          <RegisterFormComponent
            isReadOnly={isEdit === false}
            formControl={formControl}
          />
        )}
      </Stack>
    </Box>
  );
}
