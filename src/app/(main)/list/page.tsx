import TableListComponent from '@/components/TableList.component';
import { listMock } from '@/data/mock';
import { formatDate } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import {
  Box,
  Button,
  Divider,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

export default function ListRegisterPage() {
  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'ชื่อรายการ', align: 'center' },
    { value: 'สร้างเมื่อ' },
    { value: 'ไฟล์แนบ' },
  ];
  return (
    <Box>
      <Typography fontSize={18}>รายการลงงทะเบียน</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <TableListComponent heads={headers}>
        {listMock.map((list, key) => (
          <TableRow
            key={list.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell
              style={{ padding: '5px 9px' }}
              align='center'
              component='th'
              scope='row'
            >
              {key + 1}
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='left'>
              <Typography flexWrap={'wrap'} fontSize={12}>
                {list.name}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <Typography fontSize={12}>
                {formatDate(list.created_at)}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <Button
                size='small'
                sx={{ textDecoration: 'underline' }}
                color='info'
                variant='text'
              >
                เปิดไฟล์
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableListComponent>
    </Box>
  );
}
