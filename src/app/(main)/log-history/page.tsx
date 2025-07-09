import SearchComponent from '@/components/Search.component';
import TableListComponent from '@/components/TableList.component';
import { listMock, mockLog } from '@/data/mock';
import { formatDate } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import {
  Box,
  Button,
  Divider,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

export default function LogHistoryPage() {
  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'วิธีการ', align: 'left' },
    { value: 'รายการ', align: 'center' },
    { value: 'เมื่อ' },
    { value: 'ผู้ใช้' },
  ];
  return (
    <Box>
      <Typography fontSize={18}>ประวัติการดำเนินการ</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <TableListComponent heads={headers}>
        {mockLog.map((list, key) => (
          <TableRow
            key={key}
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
              <Typography
                sx={{ textTransform: 'capitalize' }}
                flexWrap={'wrap'}
                fontSize={12}
              >
                {list.type}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='left'>
              <Typography flexWrap={'wrap'} fontSize={12}>
                {list.message}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <Typography fontSize={12}>
                {formatDate(list.created_at)}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <Typography flexWrap={'wrap'} fontSize={12}>
                {list.user.role}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableListComponent>
    </Box>
  );
}
