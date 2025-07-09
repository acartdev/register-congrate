'use client';
import { MenuManageProps } from '@/model/unity.model';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import PermissionDialog from './dialog/Permission-Dialog.component';
import { useState } from 'react';
import DeleteDialog from './dialog/DeleteDialog.component';

export default function MenuManageComponent({
  anchorEl,
  open,
  handleClose,
  user,
}: MenuManageProps) {
  const [openPermit, setOpenPermit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
            color='warning'
            sx={{ p: 0, fontSize: 16, m: 0 }}
            size='small'
            LinkComponent={Link}
            href={`/edit-user/${user.userID}`}
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
        onClose={() => setOpenPermit(false)}
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
