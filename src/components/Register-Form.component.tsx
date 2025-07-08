import { NamePrefix } from '@/model/form.model';
import { FormAction } from '@/model/unity.model';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export default function RegisterFormComponent({
  data,
  isReadOnly,
}: FormAction) {
  const [namePrefix, setNamePrefix] = useState<NamePrefix>(NamePrefix.MR);
  function preFixChange(event: SelectChangeEvent) {
    setNamePrefix(event.target.value as NamePrefix);
  }
  if (data) {
  }
  return (
    <Stack paddingX={3} spacing={2}>
      <TextField
        size='small'
        slotProps={{
          input: {
            readOnly: isReadOnly,
          },
        }}
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
              inputProps={{ readOnly: isReadOnly }}
            >
              <MenuItem value={NamePrefix.MR}>นาย</MenuItem>
              <MenuItem value={NamePrefix.MS}>นาง</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={'auto'}>
          <TextField
            slotProps={{
              input: {
                readOnly: isReadOnly,
              },
            }}
            size='small'
            required
            type='password'
            id='name'
            label='ชื่อจริง'
          />
        </Grid>
      </Grid>

      <TextField
        slotProps={{
          input: {
            readOnly: isReadOnly,
          },
        }}
        size='small'
        required
        type='password'
        id='password'
        label='นาสกุลจริง'
      />
      <TextField
        slotProps={{
          input: {
            readOnly: isReadOnly,
          },
        }}
        size='small'
        type='phone'
        id='phone'
        label='เบอร์โทรศัพท์'
        placeholder='0987654321'
      />
      <TextField
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
      />
      <FormControl size='small'>
        <InputLabel id='select-prefix-list'>แผนกวิชา</InputLabel>
        <Select
          inputProps={{ readOnly: isReadOnly }}
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
          inputProps={{ readOnly: isReadOnly }}
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
  );
}
