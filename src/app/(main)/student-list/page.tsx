'use client';
import TableListComponent from '@/components/TableList.component';
import { mockUser, mockUsers } from '@/data/mock';
import { shortDepartMent } from '@/helper/table.helper';
import { TableHeadModel } from '@/model/form.model';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import SearchComponent from '@/components/Search.component';
import DepartMentSearchComponent from '@/components/Department-Search.component';
import MenuManageComponent from '@/components/MenuManage.component';
import { Department, User, UserRole } from '@/model/user.model';
import { buttonBgLinear } from '@/theme/utils';
import { useUserStore } from '@/_store/userStore';
import { useGetUsersFilter } from '@/hook/user.hook';
export default function StudentListPage() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const [selected, setSelected] = useState<User | undefined>(undefined);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUserStore();
  const [deptID, setDeptID] = useState<number | undefined>(user?.deptID || 1);

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
  const headers: TableHeadModel[] = [
    {
      value: '#',
    },
    { value: 'ชื่อ-นามสกุล', align: 'center' },
    { value: 'แผนก', align: 'center' },
    { value: 'ยืนยันตัวตน', align: 'center' },
    { value: 'จัดการ' },
  ];
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
    UserRole.STUDENT,
    deptID,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Box>
      <Typography fontSize={18}>รายชื่อนักศึกษา</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid
        container
        rowGap={1}
        marginBottom={1}
        justifyContent={'space-between'}
        alignItems={'center'}
        columnGap={1}
      >
        <Grid size={7.5}>
          <SearchComponent
            handleChange={handleChange}
            placholder='ค้นหาชื่อหรือรหัส'
          />
        </Grid>
        <Grid size={'grow'}>
          <Button
            fullWidth
            LinkComponent={Link}
            href='/edit-user?role=STUDENT'
            sx={{
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
        <Grid size={12}>
          <DepartMentSearchComponent setDeptID={setDeptID} deptID={deptID} />
        </Grid>
      </Grid>
      <TableListComponent heads={headers}>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={4} align='center'>
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        )}
        {!listData?.data?.length && !isLoading && (
          <TableRow>
            <TableCell colSpan={4} align='center'>
              <Typography color='textSecondary'>ไม่พบข้อมูล</Typography>
            </TableCell>
          </TableRow>
        )}
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
                {shortDepartMent(list?.department?.name)}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='center'>
              <Typography fontSize={12}>
                {list?.isVerified ? '✅' : '❌'}
              </Typography>
            </TableCell>
            <TableCell style={{ padding: '5px 9px' }} align='right'>
              <IconButton
                onClick={(event) =>
                  handleClick(
                    event,
                    list as Omit<User, 'department'> & {
                      department: Department | null;
                    },
                  )
                }
              >
                <MoreHorizIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
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
