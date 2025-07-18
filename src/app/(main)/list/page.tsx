'use client';

import SearchComponent from '@/components/Search.component';
import TableListComponent from '@/components/TableList.component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { listMock } from '@/data/mock';
import { formatDate } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useRouter } from 'next/navigation';
export default function ListRegisterPage() {
  const router = useRouter();

  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'ชื่อรายการ', align: 'center' },
    { value: 'วันที่' },
    { value: 'ไฟล์แนบ' },
  ];

  const handleRowClick = (id: number) => {
    router.push(`/qr-code/${id}`);
  };
  return (
    <Box>
      <Typography fontSize={18}>รายการลงงทะเบียน</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid
        container
        columnGap={1}
        marginBottom={1}
        justifyContent={'space-between'}
      >
        <Grid alignSelf={'center'} size={'grow'}>
          <Button
            LinkComponent={Link}
            href='/qr-code/create'
            sx={{
              width: '100%',
              fontSize: 13,
              fontWeight: '600',
              letterSpacing: 1.3,
              color: 'white',
              ...buttonBgLinear,
            }}
            variant='contained'
            endIcon={<AddCircleIcon />}
          >
            เพิ่มข้อมูล
          </Button>
        </Grid>
        <Grid size={7.5}>
          <SearchComponent placholder='ค้นหาชื่อรายการ' />
        </Grid>
      </Grid>
      <TableListComponent heads={headers}>
        {listMock.map((list, key) => (
          <TableRow
            key={list.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
            onClick={() => handleRowClick(list.id)}
          >
            <TableCell
              style={{ padding: '5px 9px' }}
              align='center'
              component='th'
              scope='row'
            >
              {key + 1}
            </TableCell>
            <TableCell width={180} style={{ padding: '5px 9px' }} align='left'>
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
              <IconButton color='info'>
                <InsertDriveFileIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableListComponent>
    </Box>
  );
}
