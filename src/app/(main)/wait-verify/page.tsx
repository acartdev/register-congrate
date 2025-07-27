'use client';

import SearchComponent from '@/components/Search.component';
import TableListComponent from '@/components/TableList.component';
import { waitVerifyMock } from '@/data/mock';
import { formatDate } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import { buttonBgLinear } from '@/theme/utils';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

export default function WaitVerifyPage() {
  const [users, setUsers] = useState(waitVerifyMock);

  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'รหัสผู้ใช้', align: 'center' },
    { value: 'ชื่อ-นามสกุล', align: 'center' },
    { value: 'อีเมล', align: 'center' },
    { value: 'ภาควิชา', align: 'center' },
    { value: 'วันที่สมัคร' },
    { value: 'สถานะ', align: 'center' },
    { value: 'การดำเนินการ', align: 'center' },
  ];

  const handleApprove = (userId: string) => {
    setUsers(users.map(user => 
      user.userID === userId 
        ? { ...user, verificationStatus: 'approved' as const }
        : user
    ));
  };

  const handleReject = (userId: string) => {
    setUsers(users.map(user => 
      user.userID === userId 
        ? { ...user, verificationStatus: 'rejected' as const }
        : user
    ));
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip label="รอการอนุมัติ" color="warning" size="small" />;
      case 'approved':
        return <Chip label="อนุมัติแล้ว" color="success" size="small" />;
      case 'rejected':
        return <Chip label="ปฏิเสธ" color="error" size="small" />;
      default:
        return <Chip label="ไม่ทราบสถานะ" color="default" size="small" />;
    }
  };

  return (
    <Box>
      <Typography fontSize={18}>รายชื่อผู้ใช้รออนุมัติ</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid
        container
        columnGap={1}
        marginBottom={1}
        justifyContent={'space-between'}
      >
        <Grid alignSelf={'center'} size={'grow'}>
          <Typography variant="body2" color="text.secondary">
            รายชื่อผู้ใช้ที่รอการอนุมัติจากผู้ดูแลระบบ
          </Typography>
        </Grid>
        <Grid size={7.5}>
          <SearchComponent placholder='ค้นหาชื่อหรือรหัสผู้ใช้' />
        </Grid>
      </Grid>
      <TableListComponent heads={headers}>
        {users.map((user, key) => (
          <TableRow
            key={user.userID}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              backgroundColor: user.verificationStatus === 'approved' 
                ? '#f1f8e9' 
                : user.verificationStatus === 'rejected' 
                ? '#ffebee' 
                : 'inherit'
            }}
          >
            <TableCell
              style={{ padding: '5px 9px' }}
              align='center'
              component='th'
              scope='row'
            >
              {key + 1}
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {user.userID}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {user.firstName} {user.lastName}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {user.email}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {user.department}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <Typography fontSize={12}>
                {formatDate(user.created_at)}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              {getStatusChip(user.verificationStatus)}
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              {user.verificationStatus === 'pending' ? (
                <Box display="flex" gap={1} justifyContent="center">
                  <Button
                    size="small"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleApprove(user.userID)}
                    sx={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                      backgroundColor: 'success.main',
                      '&:hover': {
                        backgroundColor: 'success.dark',
                      },
                    }}
                    variant='contained'
                  >
                    อนุมัติ
                  </Button>
                  <Button
                    size="small"
                    startIcon={<CancelIcon />}
                    onClick={() => handleReject(user.userID)}
                    sx={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                      backgroundColor: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.dark',
                      },
                    }}
                    variant='contained'
                  >
                    ปฏิเสธ
                  </Button>
                </Box>
              ) : (
                <Typography fontSize={12} color="text.secondary">
                  ดำเนินการแล้ว
                </Typography>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableListComponent>
    </Box>
  );
}