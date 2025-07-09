import { menuTab } from '@/data/menu-tab';
import { mockUser } from '@/data/mock';
import { NamePrefix } from '@/model/form.model';
import { ModalAction } from '@/model/unity.model';
import { Permission, User } from '@/model/user.model';
import { backgroundMenuLinear } from '@/theme/utils';
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuDrawer({ open, onClose }: ModalAction) {
  const DrawerList = (
    <Box>
      <List disablePadding>
        {menuTab[Permission.ADMIN].map((item) => (
          <ListItem key={item.id} onClick={onClose}>
            <Button
              size='small'
              sx={{ padding: 0 }}
              LinkComponent={Link}
              href={item.path}
            >
              <ListItemIcon sx={{ minWidth: 0, marginRight: 1 }}>
                {<item.Icon color='secondary' />}
              </ListItemIcon>
              <ListItemText secondary={item.name} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          borderBottomRightRadius: '30px',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          minWidth: '60vw',
          height: '100%',
          paddingTop: 2,
          ...backgroundMenuLinear,
        }}
      >
        <Stack>
          <Container>
            <Grid container>
              <Grid size={4}>
                <Image
                  src={'/img/logo.png'}
                  alt='logo'
                  width={60}
                  className='logo'
                  height={60}
                  priority
                />
              </Grid>
              <Grid size={8} justifyContent={'flex-start'}>
                <Box
                  height={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                >
                  <Typography color='textPrimary'>
                    {mockUser.firstName + ' ' + mockUser.lastName}
                  </Typography>
                  <Typography fontSize={12} color='textSecondary'>
                    {mockUser.userID}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 2 }} />
          </Container>
          {DrawerList}
        </Stack>
      </Box>
    </Drawer>
  );
}
