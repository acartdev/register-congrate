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
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm } from '@/model/form.model';
import { LoginSchemaModel } from '@/schema/form.schema';
import { useLogin } from '@/hook/auth.hook';
import ErrorDialog from '@/components/dialog/Error-Dialog.component';
import LoadingComponent from '@/components/Loading.component';
import { AxiosError } from 'axios';
import { HttpResponse } from '@/model/http.model';

export default function LoginPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('กรุณาลองใหม่อีกครั้ง');
  
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

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (isValid) {
      loginMutation.mutate(data, {
        onError: (err) => {
          if (err instanceof Error) {
            const error = err as AxiosError<HttpResponse<string>>;
            setErrorMessage(error.response?.data?.message || 'เข้าสู่ระบบล้มเหลว');
          } else {
            setErrorMessage('เข้าสู่ระบบล้มเหลว');
          }
          setOpenDialog(true);
        },
      });
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

        <LoadingComponent open={loginMutation.isPending} />
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
