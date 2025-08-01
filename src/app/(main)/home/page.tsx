'use client';
import RegisterFormComponent from '@/components/Register-Form.component';
import { NamePrefix, RegisterForm } from '@/model/form.model';
import { RegisterSchema } from '@/schema/form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSnackStore } from '@/_store/snackStore';
import { Permission, User, UserRole } from '@/model/user.model';
import LoadingComponent from '@/components/Loading.component';
import { useAuth } from '@/hook/auth.hook';
import { useUpdateUser } from '@/hook/user.hook';
import { HttpResponse } from '@/model/http.model';
import { AxiosError } from 'axios';
import { useUserStore } from '@/_store/userStore';

export default function Homepage() {
  const [isEdit, setIsEdit] = useState(false);
  const { onOpenSnack, updateSnackContent } = useSnackStore();
  const { user, isLoading } = useAuth();
  const { mutate, isPending } = useUpdateUser();
  const { setUser } = useUserStore();
  const formControl = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      prefix: NamePrefix.MR,
      userID: '',
      deptID: 1,
      email: '',
      firstName: '',
      lastName: '',
      role: UserRole.STUDENT,
      permit: Permission.VIEW,
      phone: '',
    },
  });

  const {
    reset,
    watch,
    handleSubmit,

    formState: { isDirty, isSubmitSuccessful, isValid },
  } = formControl;
  useEffect(() => {
    if (user) {
      setUser(user as User);
      reset({
        ...user,
        prefix: user.prefix || NamePrefix.MR,
        deptID: user.deptID || 1,
        role: user.role || UserRole.STUDENT,
        permit: user.permit || Permission.VIEW,
        phone: user.phone || '',
      });
    }
    if (isSubmitSuccessful) {
      reset(watch(), {
        keepValues: true,
        keepDirty: false,
        keepDefaultValues: false,
      });
    }
  }, [reset, watch, isSubmitSuccessful, user]);

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    if (!isDirty) {
      updateSnackContent({
        status: 'warning',
        title: 'ข้อมูลยังไม่ถูกแก้ไข กรุณาตรวจสอบ',
      });
      onOpenSnack();
      return;
    }
    if (isValid) {
      data.uuid = user?.uuid || '';
      mutate(data, {
        onSuccess: () => {
          updateSnackContent({
            title: 'แก้ไขข้อมูลสำเร็จ',
            status: 'success',
          });
          onOpenSnack();
          setIsEdit(false);
        },
        onError: (error) => {
          const err = error as AxiosError<HttpResponse<string>>;
          updateSnackContent({
            status: 'error',
            title:
              err.response?.data?.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล',
          });
          onOpenSnack();
        },
      });
      return;
    } else {
      updateSnackContent({
        status: 'error',
        title: 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบ',
      });
      onOpenSnack();
      return;
    }
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
        ยกเลิก {isValid}
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
    <Box width={{ xs: '100%', sm: 600 }} marginX={'auto'} paddingY={2}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <LoadingComponent open={isPending} />
        <Typography fontSize={18}>ข้อมูลส่วนตัว</Typography>
        {ButtonAction}
      </Box>
      <Divider sx={{ marginY: 1.5 }} />
      <Stack marginTop={4}>
        {isLoading ? (
          <LoadingComponent open={isLoading} />
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
