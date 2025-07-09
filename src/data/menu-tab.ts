import { MenuModel } from '@/model/unity.model';
import { Permission } from '@/model/user.model';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import Person3Icon from '@mui/icons-material/Person3';
export const menuTab: MenuModel = {
  [Permission.ADMIN]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon },
    { id: 3, name: 'รายชื่อผู้ดูแล', Icon: AdminPanelSettingsIcon },
    { id: 4, name: 'รายชื่ออาจารย์', Icon: Person3Icon },
    { id: 5, name: 'รายชื่อนักศึกษา', Icon: PeopleIcon },
    { id: 6, name: 'จัดการประวัติ', Icon: ManageHistoryIcon },
    { id: 7, name: 'แดชบอร์ด', Icon: PersonIcon },
  ],
  [Permission.STAFF_STUDENT]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon },
    { id: 3, name: 'รายชื่ออาจารย์', Icon: Person3Icon },
    { id: 4, name: 'รายชื่อนักศึกษา', Icon: PeopleIcon },
    { id: 5, name: 'คิวอาร์โค้ด', Icon: QrCodeScannerIcon },
    { id: 6, name: 'จัดการประวัติ', Icon: ManageHistoryIcon },
  ],
  [Permission.STAFF_TEACHER]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon },
    { id: 3, name: 'รายชื่ออาจารย์', Icon: Person3Icon },
    { id: 4, name: 'รายชื่อนักศึกษา', Icon: PeopleIcon },
    { id: 5, name: 'จัดการประวัติ', Icon: ManageHistoryIcon },
  ],
  [Permission.VIEW]: [
    { id: 1, name: 'ข้อมูลส่วนตัว', Icon: PersonIcon },
    { id: 2, name: 'รายการลงทะเบียน', Icon: ReceiptLongIcon },
    { id: 3, name: 'รายชื่ออาจารย์', Icon: Person3Icon },
    { id: 4, name: 'คิวอาร์โค้ด', Icon: QrCodeScannerIcon },
  ],
};
