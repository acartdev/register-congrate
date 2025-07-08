import { passwordHint } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SuccessDialog from './dialog/Success-Dialog.component';
import { useState } from 'react';

export default function CreatePasswordComponent() {
  const [open, onOpen] = useState(false);
  function handleClose() {
    onOpen(false);
  }
  function handleOpen() {
    onOpen(true);
  }
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
            size='small'
            placeholder='*********'
            required
            type='password'
            id='password'
            label='รหัสผ่านใหม่'
            helperText={passwordHint}
          />
          <TextField
            size='small'
            required
            type='password'
            id='c-password'
            placeholder='*********'
            label='ยืนยันรหัสผ่าน'
          />
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              onClick={handleOpen}
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
        onClose={handleClose}
        open={open}
      />
    </>
  );
}
