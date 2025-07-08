import { Box, Drawer } from '@mui/material';
import CreatePasswordComponent from '../Create-Password.component';

export default function CreatePasswordDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) {
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '30px',
        },
      }}
      anchor={'bottom'}
      open={open}
      onClose={onClose}
    >
      <Box minHeight={'70vh'} padding={'1em'}>
        <CreatePasswordComponent />
      </Box>
    </Drawer>
  );
}
