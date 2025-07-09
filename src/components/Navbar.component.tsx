import { navbarSyle } from '@/theme/utils';
import { Box, IconButton } from '@mui/material';
import Image from 'next/image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export default function NavbarComponent({
  openMenu,
}: {
  openMenu: (status: boolean) => void;
}) {
  const handleOpen = () => openMenu(true);
  return (
    <Box sx={{ ...navbarSyle }} component={'nav'}>
      <IconButton onClick={handleOpen} aria-label='menu' color='primary'>
        <FormatListBulletedIcon />
      </IconButton>
      <Image
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
        width={40}
        height={40}
        priority
        src={'/img/logo.png'}
        alt='logo'
      />
    </Box>
  );
}
