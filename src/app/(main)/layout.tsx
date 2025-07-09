'use client';
import MenuDrawer from '@/components/drawer/Menu-Drawer.componen';
import NavbarComponent from '@/components/Navbar.component';
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
  return (
    <>
      <NavbarComponent openMenu={setOpen} />
      <Box height={18}></Box>
      <Container>{children}</Container>
      <MenuDrawer open={open} onClose={handleClose} />
    </>
  );
}
