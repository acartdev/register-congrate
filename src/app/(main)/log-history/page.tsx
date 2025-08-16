'use client';
import TableListComponent from '@/components/TableList.component';
import { formatDate } from '@/helper/table.helper';
import { useGetLogs } from '@/hook/logs.hook';
import { TableHeadModel } from '@/model/form.model';
import {
  Box,
  CircularProgress,
  Divider,
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
  ];
  const { data: logData, isLoading } = useGetLogs();

  return (
    <Box>
      <Typography fontSize={18}>ประวัติการดำเนินการ</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <TableListComponent heads={headers}>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={5} align='center'>
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        )}
        {!logData?.length && !isLoading && (
          <TableRow>
            <TableCell colSpan={5} align='center'>
              <Typography color='textSecondary'>ไม่พบข้อมูล</Typography>
            </TableCell>
          </TableRow>
        )}
        {logData?.map((list, key) => (
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
          </TableRow>
        ))}
      </TableListComponent>
      {/* <Box marginTop={2} width={'100%'} display={'flex'} justifyContent={'end'}>
        <Pagination count={5} />
      </Box> */}
    </Box>
  );
}
