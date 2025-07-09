'use client';
import RegisterFormComponent from '@/components/Register-Form.component';

import { NamePrefix, RegisterForm } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function EditUserPages() {
  const router = useRouter();

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
  const { handleSubmit } = formControl;

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {};
  return (
    <Box>
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
