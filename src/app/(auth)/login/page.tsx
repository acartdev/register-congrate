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
import { LoginForm } from '@/model/form.model';
import { LoginSchemaModel } from '@/schema/form.schema';

import ErrorDialog from '@/components/dialog/Error-Dialog.component';
import LoadingComponent from '@/components/Loading.component';
import { signIn } from 'next-auth/react';
import z from 'zod';
import { isEmpty } from 'lodash';
import { useSnackStore } from '@/_store/snackStore';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('กรุณาลองใหม่อีกครั้ง');
  const { onOpenSnack, updateSnackContent } = useSnackStore();

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const error = searchParams.get('error');
    const verified = searchParams.get('verified');

    if (error) {
      setErrorMessage(decodeURIComponent(error));
      setOpenDialog(true);
      // Clear the error from URL
      window.history.replaceState({}, '', '/login');
    }
    if (verified) {
      if (verified === 'true') {
        updateSnackContent({
          title: 'ยืนยันตัวตนสำเร็จ',
          description: 'คุณได้ยืนยันตัวตนเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ',
          status: 'success',
        });
        onOpenSnack();
      } else {
        updateSnackContent({
          title: 'เกิดข้อผิดพลาดในการยืนยันตัวตน',
          description: 'กรุณาลองใหม่อีกครั้ง',
          status: 'error',
        });
        onOpenSnack();
      }
    }
    setLoading(false);
  }, [searchParams]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchemaModel),
    defaultValues: {
      userID: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchemaModel>) => {
    if (isValid) {
      setLoading(true);
      try {
        const result = await signIn('credentials', {
          redirect: false,
          userID: values.userID,
          password: values.password,
        });
        if (result?.error) {
          setErrorMessage(result.code as string);
          setOpenDialog(true);
        } else {
          if (result?.status === 200 && !isEmpty(result.url)) {
            router.replace('/');
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const [open, onOpen] = useState(false);
  function handleClose() {
    onOpen(false);
  }
  function handleOpen() {
    onOpen(true);
  }

  return (
    <>
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
                เข้าสู่ระบบ
              </Typography>
              <Typography textAlign={'center'} color='grey.A400' fontSize={12}>
                กรุณากรอกรหัสนักศึกษา หรือ รหัสอาจารย์เพื่อเข้าใช้งานระบบ
              </Typography>
              <Stack paddingX={3}>
                <TextField
                  {...register('userID')}
                  size='small'
                  required
                  type='text'
                  error={!!errors.userID}
                  helperText={errors.userID?.message?.toString()}
                  id='username'
                  label='รหัสนักศึกษา / อาจารย์'
                  slotProps={{
                    input: { inputMode: 'numeric' },
                    htmlInput: {
                      inputMode: 'numeric',
                    },
                  }}
                />
                <Box height={18}></Box>
                <TextField
                  {...register('password')}
                  size='small'
                  required
                  type='password'
                  id='password'
                  label='รหัสผ่าน'
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString()}
                />
                <Button
                  sx={{
                    width: 'fit-content',
                    alignContent: 'flex-start',
                    textDecoration: 'underline',
                  }}
                  color='info'
                  variant='text'
                  size='small'
                  onClick={handleOpen}
                >
                  หากลืมรหัสผ่าน?
                </Button>
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
                  เข้าสู่ระบบ
                </Button>
              </Box>
              <Typography color='secondary' textAlign={'center'} fontSize={12}>
                หากท่านยังไม่มีบัญชี หรือ ยังไม่ได้ลงทะเบียนกรุณา{' '}
                <Button
                  LinkComponent={Link}
                  href='/register'
                  size='small'
                  color='info'
                  sx={{ textDecoration: 'underline' }}
                  variant='text'
                >
                  สมัครสมาชิก
                </Button>
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <ResetPasswordDialog open={open} onClose={handleClose} />
      </Box>
    </>
  );
}
