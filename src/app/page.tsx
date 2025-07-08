import RegisterFormComponent from '@/components/Register-Form.component';
// import { NamePrefix } from '@/model/form.model';
// import { User } from '@/model/user.model';
import { Box } from '@mui/material';
// const mockInfo: User = {
//   prefix: NamePrefix.MR,
//   firstName: 'ธนภัทร',
//   lastName: 'กองเงิน',
//   department: {
//     id: 1,
//     name: 'เทคโนโลยีสารสนเทศ',
//   },
//   email: '65309010013@gsuite.udvc.ac.th',
//   phone: '0910768304',
// };
export default function Home() {
  return (
    <Box>
      <RegisterFormComponent isReadOnly={true} />
    </Box>
  );
}
