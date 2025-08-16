'use client';
import { MenuManageProps } from '@/model/unity.model';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import PermissionDialog from './dialog/Permission-Dialog.component';
import { useState } from 'react';
import DeleteDialog from './dialog/DeleteDialog.component';
import { orange } from '@mui/material/colors';
import { useSnackStore } from '@/_store/snackStore';

export default function MenuManageComponent({
  anchorEl,
  open,
  handleClose,
  user,
}: MenuManageProps) {
  const [openPermit, setOpenPermit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { onOpenSnack, updateSnackContent } = useSnackStore();

  const handlePermitClose = (state: boolean) => {
    if (state) {
      updateSnackContent({
        title: 'จัดการสิทธิ์สำเร็จ',
        description: 'คุณได้จัดการสิทธิ์ของผู้ใช้เรียบร้อยแล้ว',
        status: 'success',
      });
      onOpenSnack();
      setOpenPermit(false);
    } else {
      updateSnackContent({
        title: 'จัดการสิทธิ์ไม่สำเร็จ',
        description: 'คุณไม่สามารถจัดการสิทธิ์ของผู้ใช้ได้',
        status: 'error',
      });
      onOpenSnack();
    }
  };
  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <Button
            sx={{ p: 0, fontSize: 16, m: 0, color: orange[600] }}
            size='small'
            LinkComponent={Link}
            href={`/edit-user/${user?.uuid}`}
          >
            แก้ไข
          </Button>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenPermit(true);
            handleClose();
          }}
        >
          <Button color='info' sx={{ p: 0, fontSize: 16, m: 0 }} size='small'>
            จัดการสิทธิ์
          </Button>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDelete(true);
            handleClose();
          }}
        >
          <Button color='error' sx={{ p: 0, fontSize: 16, m: 0 }} size='small'>
            ลบ
          </Button>
        </MenuItem>
      </Menu>
      <PermissionDialog
        open={openPermit}
        onClose={handlePermitClose}
        user={user}
      />
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        user={user}
      />
    </>
  );
}
