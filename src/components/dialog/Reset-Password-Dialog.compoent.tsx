import { buttonBgLinear } from '@/theme/utils';
import {
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import SuccessDialog from './Success-Dialog.component';
import { ModalAction } from '@/model/unity.model';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema } from '@/schema/form.schema';

export default function ResetPasswordDialog({ open, onClose }: ModalAction) {
  const [openSuccess, onOpenSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    onOpenSuccess(true);
  };
  function handleCloseSuccess() {
    onOpenSuccess(false);
    onClose();
  }

  return (
    <>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
          },
        }}
        anchor={'bottom'}
        open={open}
        onClose={onClose}
      >
        <Box minHeight={'70vh'} padding={'1em'}>
          <Stack spacing={4}>
            <Typography
              textAlign={'center'}
              color='secondary.main'
              fontWeight={'700'}
              letterSpacing={1}
              fontSize={24}
            >
              กู้คืนรหัสผ่าน
            </Typography>
            <Stack
              component={'form'}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              paddingX={2}
              spacing={3}
            >
              <TextField
                size='small'
                required
                type='email'
                id='email'
                placeholder='example@email.com'
                label='อีเมล'
                {...register('email')}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <Box display={'flex'} justifyContent={'center'}>
                <Button
                  type='submit'
                  sx={{
                    width: '100%',
                    fontSize: 18,
                    fontWeight: '600',
                    letterSpacing: 1.3,
                    color: 'white',
                    ...buttonBgLinear,
                  }}
                  variant='contained'
                >
                  ส่งลิงก์เปลี่ยนรหัส
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
          </Stack>
        </Box>
      </Drawer>
      <SuccessDialog
        title='ส่งคำขอกู้คืนรหัสผ่าน'
        description='กรุณาตรวจสอบอีเมลของท่านเพื่อกู้คืนรหัสผ่าน'
        onClose={handleCloseSuccess}
        open={openSuccess}
        isLink={false}
      />
    </>
  );
}
