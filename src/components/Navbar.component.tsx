'use client';
import { navbarSyle } from '@/theme/utils';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
export default function NavbarComponent({
  openMenu,
}: {
  openMenu: (status: boolean) => void;
}) {
  const handleOpen = () => openMenu(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };
  return (
    <Box sx={{ ...navbarSyle }} component={'nav'}>
      <IconButton onClick={handleOpen} aria-label='menu' color='primary'>
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton onClick={handleClick}>
        <Image
          style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
          width={40}
          height={40}
          priority
          src={'/img/logo.png'}
          alt='logo'
        />
      </IconButton>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <Button
            color='error'
            sx={{ p: 0, fontSize: 16, m: 0 }}
            size='small'
            onClick={handleClose}
            endIcon={<LoginIcon color='error' />}
          >
            ออกจากระบบ
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
}
