'use client';
import { departmentDefault } from '@/data/department';
import { NamePrefix, RegisterForm } from '@/model/form.model';
import { FormAction } from '@/model/unity.model';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { isEmpty } from 'lodash';

export default function RegisterFormComponent({
  isReadOnly,
  formControl,
}: FormAction<RegisterForm>) {
  const {
    register,
    formState: { errors },
    getValues,
  } = formControl;

  return (
    <Stack paddingX={3} spacing={2}>
      <TextField
        size='small'
        slotProps={{
          input: {
            readOnly: !isEmpty(getValues('userID')),
            disabled: !isEmpty(getValues('userID')),
          },
          htmlInput: {
            inputMode: 'numeric',
          },
        }}
        {...register('userID')}
        required
        type='text'
        id='username'
        autoFocus
        placeholder='65309010013'
        error={!!errors.userID}
        helperText={errors.userID?.message}
        label='รหัสนักศึกษา / อาจารย์'
      />
      <Grid container columnGap={1} justifyContent={'space-between'}>
        <Grid size={4} justifySelf={'flex-end'}>
          <FormControl fullWidth size='small'>
            <InputLabel id='select-prefix-list'>คำนำหน้า</InputLabel>
            <Select
              {...register('prefix')}
              labelId='select-prefix-list'
              id='select-prefix'
              defaultValue={NamePrefix.MR}
              label='คำนำหน้า'
              slotProps={{
                input: {
                  readOnly: isReadOnly,
                },
              }}
            >
              <MenuItem value={NamePrefix.MR}>{NamePrefix.MR}</MenuItem>
              <MenuItem value={NamePrefix.MS}>{NamePrefix.MS}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={7.5}>
          <TextField
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            slotProps={{
              input: {
                readOnly: isReadOnly,
              },
            }}
            size='small'
            fullWidth
            required
            type='text'
            id='name'
            label='ชื่อจริง'
          />
        </Grid>
      </Grid>

      <TextField
        {...register('lastName')}
        slotProps={{
          input: {
            readOnly: isReadOnly,
          },
        }}
        size='small'
        required
        type='text'
        id='password'
        label='นาสกุลจริง'
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        {...register('phone')}
        slotProps={{
          input: {
            readOnly: isReadOnly,
          },
          htmlInput: {
            inputMode: 'numeric',
          },
        }}
        size='small'
        type='phone'
        id='phone'
        label='เบอร์โทรศัพท์ (ถ้ามี)'
        placeholder='0987654321'
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        {...register('email')}
        slotProps={{
          input: {
            readOnly: isReadOnly,
          },
        }}
        size='small'
        required
        type='email'
        id='email'
        label='อีเมลสถานศึกษา'
        placeholder='example@email.com'
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <FormControl size='small'>
        <InputLabel id='select-prefix-list'>แผนกวิชา</InputLabel>
        <Select
          slotProps={{
            input: {
              readOnly: isReadOnly,
            },
          }}
          labelId='select-prefix-list'
          id='select-prefix'
          defaultValue={1}
          label='แผนกวิชา'
          {...register('deptID')}
        >
          {departmentDefault.map((item, key) => (
            <MenuItem key={key} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {/* <FormHelperText>ID ที่เลือก: {watch('deptID')}</FormHelperText> */}
      </FormControl>
    </Stack>
  );
}
