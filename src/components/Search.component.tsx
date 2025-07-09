import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchProps } from '@/model/form.model';
export default function SearchComponent({ placholder }: SearchProps) {
  return (
    <TextField
      margin='dense'
      id='search'
      fullWidth
      size='small'
      placeholder={placholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
