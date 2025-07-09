import { departmentDefault } from '@/data/department';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

export default function DepartMentSearchComponent() {
  return (
    <FormControl fullWidth margin='dense' size='small'>
      <InputLabel id='select-prefix-list'>แผนกวิชา</InputLabel>
      <Select
        labelId='select-prefix-list'
        id='select-prefix'
        defaultValue={0}
        label='แผนกวิชา'
      >
        <MenuItem value={0}>---ค้นหาแผนก---</MenuItem>
        {departmentDefault.map((item, key) => (
          <MenuItem key={key} value={item.id}>
            <Typography>{item.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
