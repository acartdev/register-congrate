import { PasswordForm, passwordHint } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SuccessDialog from './dialog/Success-Dialog.component';
import { FormControlHook, ModalAction } from '@/model/unity.model';

export default function CreatePasswordComponent({
  open,
  onClose,
  handleClick,
  formControl,
}: ModalAction & { formControl: FormControlHook<PasswordForm> }) {
  const {
    register,
    formState: { errors },
  } = formControl;
  return (
    <>
      <Stack spacing={4}>
        <Typography
          textAlign={'center'}
          color='secondary.main'
          fontWeight={'700'}
          letterSpacing={1}
          fontSize={24}
        >
          สร้างรหัสผ่านใหม่
        </Typography>
        <Stack paddingX={2} spacing={2}>
          <TextField
            {...register('password')}
            size='small'
            placeholder='*********'
            required
            type='password'
            id='password'
            label='รหัสผ่านใหม่'
            error={!!errors.password}
            helperText={
              !!errors.password ? errors?.password?.message : passwordHint
            }
          />
          <TextField
            {...register('confirmPassword')}
            size='small'
            required
            type='password'
            id='c-password'
            placeholder='*********'
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
            label='ยืนยันรหัสผ่าน'
          />
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              onClick={handleClick}
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
              สมัครสมาชิก
            </Button>
          </Box>
        </Stack>
      </Stack>
      <SuccessDialog
        title='สมัครสมาชิกสำเร็จ'
        description='กรุณาตรวจสอบอีเมลของท่านที่ใช้สมัครเพื่อยืนยันตัวตนในการสมัครสมาชิก'
        onClose={onClose}
        open={open}
      />
    </>
  );
}
