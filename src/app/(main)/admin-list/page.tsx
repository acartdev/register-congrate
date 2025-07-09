'use client';
import TableListComponent from '@/components/TableList.component';
import { mockUsers } from '@/data/mock';
import { formatDate } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import SearchComponent from '@/components/Search.component';
import { buttonBgLinear } from '@/theme/utils';
import Link from 'next/link';
export default function AdminListPage() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };
  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'ชื่อ-นามสกุล', align: 'center' },
    { value: 'สมัครเมื่อ', align: 'center' },
    { value: 'จัดการ' },
  ];
  return (
    <Box>
      <Typography fontSize={18}>รายชื่อผู้ดูแลระบบ</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid
        container
        columnGap={1}
        marginBottom={1}
        justifyContent={'space-between'}
      >
        <Grid alignSelf={'center'} size={'auto'}>
          <Button
            LinkComponent={Link}
            href='/edit-user'
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
        <Grid size={8}>
          <SearchComponent placholder='ค้นหาชื่อหรือรหัส' />
        </Grid>
      </Grid>
      <TableListComponent heads={headers}>
        {mockUsers.map((list, key) => (
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
              <Box>
                <Typography flexWrap={'wrap'} fontSize={13}>
                  {list.prefix + list.firstName + ' ' + list.lastName}
                </Typography>
                <Typography
                  color='textSecondary'
                  flexWrap={'wrap'}
                  fontSize={10}
                >
                  {list.userID}
                </Typography>
              </Box>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {formatDate(list?.created_at)}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <IconButton onClick={handleClick}>
                <MoreHorizIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableListComponent>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>แก้ไข</MenuItem>
        <MenuItem onClick={handleClose}>จัดการสิทธิ์</MenuItem>
        <MenuItem onClick={handleClose}>ลบ</MenuItem>
      </Menu>
    </Box>
  );
}
