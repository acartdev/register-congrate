'use client';
import ErrorDialog from '@/components/dialog/Error-Dialog.component';
import SuccessDialog from '@/components/dialog/Success-Dialog.component';
import RegisterFormComponent from '@/components/Register-Form.component';
import { useCreateUser } from '@/hook/user.hook';
import { useSearchParams } from 'next/navigation';

import { NamePrefix, RegisterForm } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Permission, UserRole } from '@/model/user.model';

export default function EditUserPages() {
  const searchParams = useSearchParams();
  const role: UserRole = searchParams.get('role') as UserRole;
  const router = useRouter();
  const { mutate } = useCreateUser();
  const [emailSentOpen, setEmailSentOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

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
    handleSubmit,
    formState: { isValid },
  } = formControl;

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    if (isValid && role) {
      const permit =
        role === UserRole.STUDENT
          ? Permission.VIEW
          : role === UserRole.TEACHER
            ? Permission.STAFF_TEACHER
            : Permission.VIEW;
      mutate(
        {
          ...data,
          role,
          permit: permit,
        },
        {
          onSuccess: (data) => {
            if (data.status === 201) {
              setEmailSentOpen(true);
            } else {
              setErrorMessage(data.message || 'เกิดข้อผิดพลาด');
              setOpenDialog(true);
            }
          },
        },
      );
    }
  };
  return (
    <Box>
      <SuccessDialog
        title='อีเมลยืนยันถูกส่งแล้ว'
        description='ระบบได้ส่งอีเมลยืนยันไปยังที่อยู่อีเมลของผู้ใช้เรียบร้อยแล้ว'
        onClose={() => {
          setEmailSentOpen(false);
          router.back();
        }}
        isLink={false}
        open={emailSentOpen}
      />
      <ErrorDialog
        title='เกิดข้อผิดพลาด'
        description={errorMessage}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setErrorMessage('');
        }}
        isLink={false}
      />
      <Typography fontSize={18}>เพิ่มไขข้อมูล</Typography>
      <Divider sx={{ marginBottom: 4 }} />

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
            ยกเลิกการเพิ่มข้อมูล
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
