'use client';
import BubbleComponent from '@/components/Buble.component';
import CreatePasswordDialog from '@/components/dialog/Create-Password-Dialog.component';
import RegisterFormComponent from '@/components/Register-Form.component';
import { NamePrefix, RegisterForm } from '@/model/form.model';
import { RegisterSchema } from '@/schema/form.schema';
import {
  backgroundLinear,
  buttonBgLinear,
  seconBackground,
} from '@/theme/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const steps = ['กรอกข้อมูลส่วนตัว', 'สร้างรหัสผ่าน'];
export default function RegisterPage() {
  const [open, onOpen] = useState(false);
  const [stack, setStack] = useState<number>(0);
  const formControl = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      prefix: NamePrefix.MR,
      userID: '',
      password: '',
      confirmPassword: '',
      deptID: 1,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });
  function handleClose() {
    onOpen(false);
  }
  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    onOpen(true);
    setStack(1);
    console.log(data);
  };

  return (
    <Box
      minHeight={'100vh'}
      height={'100vh'}
      width={'100%'}
      overflow={'hidden'}
      sx={{ ...backgroundLinear }}
    >
      <Stack height={'100%'} width={'100%'}>
        <Box
          position={'relative'}
          height={'10%'}
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
          <BubbleComponent />
        </Box>
        <Box
          zIndex={10}
          height={'100%'}
          width={'100%'}
          sx={{ ...seconBackground }}
          bgcolor='white'
          position={'relative'}
        >
          <Box
            position={'absolute'}
            sx={{ top: -60, left: '50%', transform: 'translateX(-50%)' }}
          >
            <Image
              src={'/img/logo.png'}
              alt='logo'
              width={100}
              height={100}
              style={{ filter: 'drop-shadow(1px 4px 2px rgba(0, 0, 0, 0.2))' }}
              quality={100}
            />
          </Box>
          <Stack
            component={'form'}
            noValidate
            method='post'
            onSubmit={formControl.handleSubmit(onSubmit)}
            marginTop={5}
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
              สมัครสมาชิก
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={stack} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{ color: 'white' }}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <RegisterFormComponent
              formControl={{ ...formControl }}
              isReadOnly={false}
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={2}
            >
              <Button
                sx={{
                  width: '85%',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 1.3,
                  color: 'white',
                  ...buttonBgLinear,
                }}
                type='submit'
                variant='contained'
              >
                สร้างรหัสผ่าน
              </Button>
              <Button
                LinkComponent={Link}
                href='/login'
                sx={{
                  width: '85%',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 1.3,
                  color: 'primary.A400',
                  borderWidth: '3px',
                }}
                variant='outlined'
              >
                ย้อนกลับ
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <CreatePasswordDialog open={open} onClose={handleClose} />
    </Box>
  );
}
