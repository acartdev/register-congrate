'use client';
import { useSnackStore } from '@/_store/snackStore';
import MenuDrawer from '@/components/drawer/Menu-Drawer.componen';
import NavbarComponent from '@/components/Navbar.component';
import SnackBarComponent from '@/components/Snackbar.component';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container aria-hidden={false}>{children}</Container>
      </LocalizationProvider>
      <MenuDrawer open={open} onClose={handleClose} />
      <SnackBarComponent {...data} open={isSnackOpen} onClose={onCloseSnack} />
    </>
  );
}
