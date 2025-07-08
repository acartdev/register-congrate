'use client';
import BubbleComponent from '@/components/Buble.component';
import CreatePasswordDialog from '@/components/dialog/Create-Password-Dialog.component';
import { NamePrefix } from '@/model/form.model';
import {
  backgroundLinear,
  buttonBgLinear,
  seconBackground,
} from '@/theme/utils';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const steps = ['กรอกข้อมูลส่วนตัว', 'สร้างรหัสผ่าน'];
export default function RegisterPage() {
  const [open, onOpen] = useState(false);
  const [namePrefix, setNamePrefix] = useState<NamePrefix>(NamePrefix.MR);
  const [stack, setStack] = useState<number>(0);
  function handleClose() {
    onOpen(false);
  }
  function handleOpen() {
    onOpen(true);
    setStack(1);
  }
  function preFixChange(event: SelectChangeEvent) {
    setNamePrefix(event.target.value as NamePrefix);
  }

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
              className='logo'
              height={100}
              quality={100}
            />
          </Box>
          <Stack
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
            <Stack paddingX={3} spacing={2}>
              <TextField
                size='small'
                required
                type='text'
                id='username'
                autoFocus
                placeholder='65309010013'
                label='รหัสนักศึกษา / อาจารย์'
              />
              <Grid container>
                <Grid size={3}>
                  <FormControl size='small'>
                    <InputLabel id='select-prefix-list'>คำนำหน้า</InputLabel>
                    <Select
                      labelId='select-prefix-list'
                      id='select-prefix'
                      value={namePrefix}
                      label='คำนำหน้า'
                      onChange={preFixChange}
                    >
                      <MenuItem value={NamePrefix.MR}>นาย</MenuItem>
                      <MenuItem value={NamePrefix.MS}>นาง</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={'auto'}>
                  <TextField
                    size='small'
                    required
                    type='password'
                    id='name'
                    label='ชื่อจริง'
                  />
                </Grid>
              </Grid>

              <TextField
                size='small'
                required
                type='password'
                id='password'
                label='นาสกุลจริง'
              />
              <TextField
                size='small'
                type='phone'
                id='phone'
                label='เบอร์โทรศัพท์'
                placeholder='0987654321'
              />
              <TextField
                size='small'
                required
                type='email'
                id='email'
                label='อีเมลสถานศึกษา'
                placeholder='example@email.com'
              />
              <FormControl size='small'>
                <InputLabel id='select-prefix-list'>แผนกวิชา</InputLabel>
                <Select
                  labelId='select-prefix-list'
                  id='select-prefix'
                  value={''}
                  label='คำนำหน้า'
                  onChange={preFixChange}
                >
                  <MenuItem value={NamePrefix.MR}>นาย</MenuItem>
                  <MenuItem value={NamePrefix.MS}>นาง</MenuItem>
                </Select>
              </FormControl>
              <FormControl size='small'>
                <InputLabel id='select-prefix-list'>สาขาวิชา</InputLabel>
                <Select
                  labelId='select-prefix-list'
                  id='select-prefix'
                  value={''}
                  label='คำนำหน้า'
                  onChange={preFixChange}
                >
                  <MenuItem value={NamePrefix.MR}>นาย</MenuItem>
                  <MenuItem value={NamePrefix.MS}>นาง</MenuItem>
                </Select>
              </FormControl>
            </Stack>
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
                onClick={handleOpen}
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
