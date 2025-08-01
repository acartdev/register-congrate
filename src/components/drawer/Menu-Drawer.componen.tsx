'use client';
import { useUserStore } from '@/_store/userStore';
import { menuTab } from '@/data/menu-tab';
import { ModalAction } from '@/model/unity.model';
import { Permission } from '@/model/user.model';
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
  const { user } = useUserStore();
  const DrawerList = (
    <Box>
      <List disablePadding>
        {user?.permit &&
          menuTab[user?.permit].map((item) => (
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
        minWidth={280}
        sx={{
          height: '100%',
          paddingTop: 2,
          ...backgroundMenuLinear,
        }}
      >
        <Stack maxWidth={280}>
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
                    {user?.firstName + ' ' + user?.lastName}
                  </Typography>
                  <Typography fontSize={12} color='textSecondary'>
                    {user?.userID}
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
