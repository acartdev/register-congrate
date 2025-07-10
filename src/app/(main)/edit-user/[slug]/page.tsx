'use client';
import { useSnackStore } from '@/_store/snackStore';
import RegisterFormComponent from '@/components/Register-Form.component';
import { mockUsers } from '@/data/mock';
import { NamePrefix, RegisterForm } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function EditUserPages({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [isLoad, setIsload] = useState(true);
  const { onOpenSnack, updateSnackContent } = useSnackStore();

  const { slug } = use(params);
  const formControl = useForm<RegisterForm>({
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
      const existUser = mockUsers.find((user) => user.userID === slug);
      setTimeout(() => {
        reset(existUser);
        setIsload(false);
      }, 2000);
    }
    if (isSubmitSuccessful) {
      reset(watch(), {
        keepValues: true,
        keepDirty: false,
        keepDefaultValues: false,
      });
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmit: SubmitHandler<RegisterForm> = () => {
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
    router.back();
  };
  return (
    <Box>
      <Typography fontSize={18}>แก้ไขข้อมูล</Typography>
      <Divider sx={{ marginBottom: 4 }} />
      {isLoad ? (
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoad}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <Stack
          component={'form'}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          justifyContent={'center'}
          spacing={2}
        >
          <RegisterFormComponent formControl={formControl} isReadOnly={false} />
          <Box
            display={'flex'}
            gap={2}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Button
              sx={{
                width: '87%',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 1.3,
                color: 'white',
                ...buttonBgLinear,
              }}
              type='submit'
              variant='contained'
            >
              บันทึกข้อมูล
            </Button>
            <Button
              onClick={() => {
                router.back();
              }}
              sx={{
                width: '87%',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 1.3,
                color: 'primary.A200',
              }}
              variant='outlined'
            >
              ยกเลิกแก้ไข
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
