'use client';
import TableListComponent from '@/components/TableList.component';
import { shortDepartMent } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DepartMentSearchComponent from '@/components/Department-Search.component';
import SearchComponent from '@/components/Search.component';
import Link from 'next/link';
import { buttonBgLinear } from '@/theme/utils';
import MenuManageComponent from '@/components/MenuManage.component';
import { Department, Permission, User, UserRole } from '@/model/user.model';
import { useUserStore } from '@/_store/userStore';
import { useGetUsersFilter } from '@/hook/user.hook';
export default function TeacherListPage() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<User | undefined>(undefined);
  const { user } = useUserStore();
  const [deptID, setDeptID] = useState<number | undefined>(user?.deptID || 0);
  const isTeacher =
    user?.permit === Permission.ADMIN ||
    user?.permit === Permission.STAFF_TEACHER;
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: Omit<User, 'department'> & { department: Department | null },
  ) => {
    setSelected({
      ...user,
      department: user.department?.name ?? undefined,
    });
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);
  const { data: listData, isLoading } = useGetUsersFilter(
    debouncedSearchTerm,
    UserRole.TEACHER,
    deptID,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'ชื่อ-นามสกุล', align: 'center' },
    { value: 'แผนก', align: 'center' },
    { value: 'ยืนยันตัวตน', align: 'center' },
  ];
  if (isTeacher) {
    headers.push({ value: 'จัดการ' });
  }
  return (
    <Box>
      <Typography fontSize={18}>รายชื่ออาจารย์</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid
        container
        columnGap={1}
        rowGap={1}
        marginBottom={1}
        justifyContent={'space-between'}
      >
        <Grid size={7.5}>
          <SearchComponent
            handleChange={handleChange}
            placholder='ค้นหาชื่อหรือรหัส'
          />
        </Grid>
        {isTeacher && (
          <Grid alignSelf={'center'} size={'grow'}>
            <Button
              LinkComponent={Link}
              href='/edit-user?role=TEACHER'
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
        )}
        {user?.permit === Permission.ADMIN && (
          <Grid size={12}>
            <DepartMentSearchComponent deptID={deptID} setDeptID={setDeptID} />
          </Grid>
        )}
      </Grid>
      <TableListComponent heads={headers}>
        {listData?.data?.map((list, key) => (
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
                {shortDepartMent(list.department?.name)}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {list?.isVerified ? '✅' : '❌'}
              </Typography>
            </TableCell>
            {isTeacher && (
              <TableCell style={{ padding: '5px 9px' }} align='right'>
                <IconButton
                  onClick={(e) =>
                    handleClick(
                      e,
                      list as Omit<User, 'department'> & {
                        department: Department | null;
                      },
                    )
                  }
                >
                  <MoreHorizIcon />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
        {isLoading && (
          <TableRow>
            <TableCell colSpan={5} align='center'>
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        )}
        {!listData?.data?.length && !isLoading && (
          <TableRow>
            <TableCell colSpan={5} align='center'>
              <Typography color='textSecondary'>ไม่พบข้อมูล</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableListComponent>
      <MenuManageComponent
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        user={selected}
      />
    </Box>
  );
}
