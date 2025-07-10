'use client';
import { useMenuStore } from '@/_store/menuManageStore';
import { useSnackStore } from '@/_store/snackStore';
import MenuDrawer from '@/components/drawer/Menu-Drawer.componen';
import MenuManageComponent from '@/components/MenuManage.component';
import NavbarComponent from '@/components/Navbar.component';
import SnackBarComponent from '@/components/Snackbar.component';
import { Box, Container } from '@mui/material';
import { useState } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { isSnackOpen, data, onCloseSnack } = useSnackStore();
  return (
    <>
      <NavbarComponent openMenu={setOpen} />
      <Box height={18}></Box>
      <Container aria-hidden={false}>{children}</Container>
      <MenuDrawer open={open} onClose={handleClose} />
      <SnackBarComponent {...data} open={isSnackOpen} onClose={onCloseSnack} />
    </>
  );
}
