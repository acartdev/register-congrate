import { ModalAction } from '@/model/unity.model';
import { buttonBgLinear } from '@/theme/utils';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface VerificationDialogProps extends ModalAction {
  onVerify: () => void;
}

export default function VerificationDialog({
  open,
  onClose,
  onVerify,
}: VerificationDialogProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSimulateAdminVerification = () => {
    setIsVerifying(true);
    // Simulate admin verification process (3 seconds)
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 3000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '1em',
        },
      }}
    >
      <DialogContent>
        <Stack spacing={4} alignItems='center' textAlign='center'>
          <HourglassEmptyIcon
            sx={{ fontSize: 60, color: 'warning.main' }}
          />
          
          <Typography
            color='secondary.main'
            fontWeight='700'
            letterSpacing={1}
            fontSize={24}
          >
            รออนุมัติจากผู้ดูแลระบบ
          </Typography>

          <Typography color='text.secondary' fontSize={16} lineHeight={1.6}>
            ข้อมูลการสมัครสมาชิกของท่านอยู่ระหว่างการตรวจสอบจากผู้ดูแลระบบ
            กรุณารอการอนุมัติก่อนใช้งานระบบ
          </Typography>

          {isVerifying && (
            <Box display='flex' alignItems='center' gap={2}>
              <CircularProgress size={24} />
              <Typography color='info.main'>
                กำลังดำเนินการอนุมัติ...
              </Typography>
            </Box>
          )}

          <Stack direction='row' spacing={2} width='100%'>
            <Button
              onClick={onClose}
              sx={{
                flex: 1,
                fontSize: 16,
                fontWeight: '600',
                letterSpacing: 1,
                color: 'primary.main',
                borderWidth: '2px',
              }}
              variant='outlined'
              disabled={isVerifying}
            >
              ปิด
            </Button>

            <Button
              onClick={handleSimulateAdminVerification}
              sx={{
                flex: 1,
                fontSize: 16,
                fontWeight: '600',
                letterSpacing: 1,
                color: 'white',
                ...buttonBgLinear,
              }}
              variant='contained'
              disabled={isVerifying}
            >
              {isVerifying ? 'กำลังอนุมัติ...' : 'จำลองการอนุมัติ'}
            </Button>
          </Stack>

          <Typography variant='caption' color='text.disabled' fontSize={12}>
            * ในระบบจริง การอนุมัติจะดำเนินการโดยผู้ดูแลระบบ
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}