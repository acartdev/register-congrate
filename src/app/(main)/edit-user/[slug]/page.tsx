'use client';
import { useSnackStore } from '@/_store/snackStore';
import LoadingComponent from '@/components/Loading.component';
import RegisterFormComponent from '@/components/Register-Form.component';
import { useGetUserByUUID, useUpdateUser } from '@/hook/user.hook';
import { NamePrefix, RegisterForm } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function EditUserPages({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { onOpenSnack, updateSnackContent } = useSnackStore();
  const { mutate: updateUser, isPending: isLoading } = useUpdateUser();
  const { slug } = use(params);
  const { data: userData, isPending } = useGetUserByUUID(slug);
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
    formState: { isDirty, isSubmitSuccessful, isValid },
  } = formControl;
  useEffect(() => {
    if (!isPending) {
      reset(userData?.data);
    }
    if (isSubmitSuccessful) {
      reset(watch(), {
        keepValues: true,
        keepDirty: false,
        keepDefaultValues: false,
      });
    }
  }, [isSubmitSuccessful, reset, isPending]);
  const onSubmit: SubmitHandler<RegisterForm> = (values) => {
    if (!isDirty) {
      updateSnackContent({
        status: 'warning',
        title: 'ข้อมูลยังไม่ถูกแก้ไข กรุณาตรวจสอบ',
      });
      onOpenSnack();
      return;
    }
    if (isValid) {
      updateUser(
        { ...values, uuid: userData?.data?.uuid },
        {
          onSuccess: (data) => {
            if (data.status === 200) {
              updateSnackContent({
                status: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
              });
              onOpenSnack();
              router.back();
            } else {
              updateSnackContent({
                status: 'error',
                title: data.message || 'เกิดข้อผิดพลาด',
              });
              onOpenSnack();
            }
          },
        },
      );
    }
  };
  return (
    <Box>
      <LoadingComponent open={isLoading} />
      <Typography fontSize={18}>แก้ไขข้อมูล</Typography>
      <Divider sx={{ marginBottom: 4 }} />
      {isPending ? (
        <LoadingComponent open={isPending} />
      ) : (
        <Stack
          component={'form'}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          justifyContent={'center'}
          spacing={2}
        >
          <RegisterFormComponent
            formControl={formControl}
            isEdit={true}
            isReadOnly={false}
          />
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
