import { MenuModel } from '@/model/unity.model';
import { Permission, User } from '@/model/user.model';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import Person3Icon from '@mui/icons-material/Person3';
import { NamePrefix } from '@/model/form.model';
import DashboardIcon from '@mui/icons-material/Dashboard';
export const menuTab: MenuModel = {
  [Permission.ADMIN]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon, path: '/home' },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon, path: '/list' },
    {
      id: 3,
      name: 'รายชื่อผู้ดูแล',
      Icon: AdminPanelSettingsIcon,
      path: '/admin-list',
    },
    { id: 4, name: 'รายชื่ออาจารย์', Icon: Person3Icon, path: '/teacher-list' },
    { id: 5, name: 'รายชื่อนักศึกษา', Icon: PeopleIcon, path: '/student-list' },
    {
      id: 6,
      name: 'จัดการประวัติ',
      Icon: ManageHistoryIcon,
      path: '/log-history',
    },
    { id: 7, name: 'แดชบอร์ด', Icon: DashboardIcon, path: '/dashboard' },
  ],
  [Permission.STAFF_STUDENT]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon, path: '/home' },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon, path: '/list' },
    { id: 3, name: 'รายชื่ออาจารย์', Icon: Person3Icon, path: '/teacher-list' },
    { id: 4, name: 'รายชื่อนักศึกษา', Icon: PeopleIcon, path: '/student-list' },
    { id: 5, name: 'คิวอาร์โค้ด', Icon: QrCodeScannerIcon, path: '/qr-code' },
    {
      id: 6,
      name: 'จัดการประวัติ',
      Icon: ManageHistoryIcon,
      path: '/log-history',
    },
  ],
  [Permission.STAFF_TEACHER]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon, path: '/home' },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon, path: '/list' },
    { id: 3, name: 'รายชื่ออาจารย์', Icon: Person3Icon, path: '/teacher-list' },
    { id: 4, name: 'รายชื่อนักศึกษา', Icon: PeopleIcon, path: '/student-list' },
    {
      id: 5,
      name: 'จัดการประวัติ',
      Icon: ManageHistoryIcon,
      path: '/log-history',
    },
  ],
  [Permission.VIEW]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon, path: '/home' },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon, path: '/list' },
    { id: 3, name: 'รายชื่ออาจารย์', Icon: Person3Icon, path: '/teacher-list' },
    { id: 4, name: 'คิวอาร์โค้ด', Icon: QrCodeScannerIcon, path: '/qr-code' },
  ],
};
