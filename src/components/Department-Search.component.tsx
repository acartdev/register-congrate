import { useGetDepartment } from '@/hook/user.hook';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

export default function DepartMentSearchComponent() {
  const { data: departments } = useGetDepartment();
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
        {departments?.data?.map((item, key) => (
          <MenuItem key={key} value={item.id}>
            <Typography>{item.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
