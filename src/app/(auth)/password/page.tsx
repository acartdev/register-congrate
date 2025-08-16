'use client';
import BubbleComponent from '@/components/Buble.component';
import ResetPasswordDialog from '@/components/dialog/Reset-Password-Dialog.compoent';
import {
  backgroundLinear,
  buttonBgLinear,
  seconBackground,
} from '@/theme/utils';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordForm } from '@/model/form.model';
import { PasswordSchema } from '@/schema/form.schema';

import ErrorDialog from '@/components/dialog/Error-Dialog.component';
import LoadingComponent from '@/components/Loading.component';
import z from 'zod';
import { useSnackStore } from '@/_store/snackStore';
import { useCreatePassword } from '@/hook/auth.hook';

export default function PasswordPage() {
  const searchParams = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('กรุณาลองใหม่อีกครั้ง');
  const { onOpenSnack, updateSnackContent } = useSnackStore();

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { mutate: createPassword, isPending } = useCreatePassword();
  useEffect(() => {
    const error = searchParams.get('error');
    const token = searchParams.get('token');

    if (error) {
      setErrorMessage(decodeURIComponent(error));
      setOpenDialog(true);
      // Clear the error from URL
      window.history.replaceState({}, '', '/login');
    }
    if (!token) {
      updateSnackContent({
        title: 'เกิดข้อผิดพลาด',
        description: 'กรุณาลองใหม่อีกครั้ง',
        status: 'error',
      });
      onOpenSnack();
    }
    setLoading(false);
  }, [searchParams]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordForm>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
    if (isValid) {
      setLoading(true);
      try {
        createPassword(
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
            token: searchParams.get('token')!,
          },
          {
            onSuccess: (response) => {
              if (response.status === 200) {
                router.replace('/login?verify=true');
              } else {
                setErrorMessage(response.message || 'เกิดข้อผิดพลาด');
                setOpenDialog(true);
              }
            },
          },
        );
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <LoadingComponent open={isPending} />
      <ErrorDialog
        title='เกิดข้อผิดพลาด'
        description={errorMessage}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        isLink={false}
      />
      <Box
        component={'form'}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        minHeight={'100vh'}
        height={'100vh'}
        width={'100%'}
        position={'relative'}
        overflow={'hidden'}
        sx={{ ...backgroundLinear }}
      >
        <BubbleComponent />

        <LoadingComponent open={loading} />
        <Stack
          height={{ xs: '100%', lg: '80%' }}
          width={{ xs: '100%', lg: '20%' }}
          margin={'auto'}
        >
          <Box
            position={'relative'}
            height={'65%'}
            width={'100%'}
            bgcolor='transparent'
            display={'flex'}
            sx={{
              flexDirection: 'column',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={'/img/logo.png'}
              alt='logo'
              width={160}
              className='logo'
              height={160}
              priority
            />
            <Typography
              color='white'
              zIndex={2}
              sx={{ textShadow: '3px 2px rgba(0,0,0,0.3)' }}
              fontWeight={'700'}
              letterSpacing={1}
              fontSize={{ xs: 20, sm: 24, md: 28 }}
            >
              ระบบลงทะเบียนรับปริญญา
            </Typography>
          </Box>
          <Box
            zIndex={10}
            height={'100%'}
            width={'100%'}
            sx={{ ...seconBackground }}
            bgcolor='white'
          >
            <Stack
              spacing={3}
              paddingX={4}
              height={'100%'}
              width={'100%'}
              padding={'1em'}
            >
              <Typography
                textAlign={'center'}
                color='secondary.main'
                fontWeight={'700'}
                letterSpacing={1}
                fontSize={24}
              >
                สร้างรหัสผ่าน
              </Typography>
              <Typography textAlign={'center'} color='grey.A400' fontSize={12}>
                กรุณาสร้างรหัสผ่านใหม่ สำหรับเข้าสู่ระบบ
              </Typography>
              <Stack paddingX={3}>
                <TextField
                  {...register('password')}
                  size='small'
                  required
                  type='password'
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString()}
                  id='password'
                  label='รหัสผ่านใหม่'
                  slotProps={{
                    input: { inputMode: 'numeric' },
                    htmlInput: {
                      inputMode: 'numeric',
                    },
                  }}
                />
                <Box height={18}></Box>
                <TextField
                  {...register('confirmPassword')}
                  size='small'
                  required
                  type='password'
                  id='c-password'
                  label='ยืนยันรหัสผ่าน'
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message?.toString()}
                />
              </Stack>

              <Box display={'flex'} justifyContent={'center'}>
                <Button
                  type='submit'
                  sx={{
                    width: '85%',
                    fontSize: 18,
                    fontWeight: '600',
                    letterSpacing: 1.3,
                    color: 'white',
                    ...buttonBgLinear,
                  }}
                  variant='contained'
                >
                  สร้างรหัสผ่าน
                </Button>
              </Box>
              <Button
                variant='text'
                color='info'
                component={Link}
                href='/login'
                sx={{ textDecoration: 'underline' }}
              >
                กลับสู่หน้าเข้าสู่ระบบ
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
