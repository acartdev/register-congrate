import { ModalAction } from '@/model/unity.model';
import {
  Box,
  Button,
  Container,
  Dialog,
  Stack,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { buttonBgLinear } from '@/theme/utils';
import Link from 'next/link';
export default function SuccessDialog({
  title,
  description,
  open,
  onClose,
  isLink = true,
}: ModalAction) {
  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '30px',
        },
      }}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Container
        sx={{ padding: 2, width: { xs: '80vw', sm: '60vw', md: '20vw' } }}
      >
        <Stack
          spacing={2}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            borderRadius={'50%'}
            display={'grid'}
            width={70}
            height={70}
            sx={{ placeContent: 'center', ...buttonBgLinear }}
          >
            <CheckIcon sx={{ fontSize: 70, color: 'white' }} />
          </Box>
          <Typography fontSize={20} color='secondary' fontWeight={'600'}>
            {title}
          </Typography>
          <Typography
            textAlign={'center'}
            fontSize={14}
            color='textSecondary'
            fontWeight={'600'}
          >
            {description}
          </Typography>
          {isLink ? (
            <Button
              LinkComponent={Link}
              href='/login'
              sx={{
                width: '60%',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 1.3,
                color: 'white',
                ...buttonBgLinear,
              }}
              size='small'
              variant='contained'
            >
              ตกลง
            </Button>
          ) : (
            <Button
              onClick={onClose}
              sx={{
                width: '60%',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 1.3,
                color: 'white',
                ...buttonBgLinear,
              }}
              size='small'
              variant='contained'
            >
              ตกลง
            </Button>
          )}
        </Stack>
      </Container>
    </Dialog>
  );
}
