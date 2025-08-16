import { Box, Drawer } from '@mui/material';
import CreatePasswordComponent from '../Create-Password.component';
import { ModalAction } from '@/model/unity.model';
import { PasswordForm, RegisterForm } from '@/model/form.model';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordSchema } from '@/schema/form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import SuccessDialog from './Success-Dialog.component';
import ErrorDialog from './Error-Dialog.component';
import { useRegister } from '@/hook/auth.hook';
import LoadingComponent from '../Loading.component';

export default function CreatePasswordDialog({
  open,
  formData,
  onClose,
}: ModalAction & { formData: RegisterForm }) {
  const [emailSentOpen, setEmailSentOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('กรุณาลองใหม่อีกครั้ง');
  const [openSuccess, setOpenSuccess] = useState(false);
  const formControl = useForm<PasswordForm>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formControl;
  const { mutate, isPending } = useRegister();
  const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
    if (!isValid) return;
    mutate(
      { ...formData, ...data },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            setEmailSentOpen(true);
            formControl.reset();
            setOpenSuccess(true);
          } else {
            setErrorMessage(data.message || 'เกิดข้อผิดพลาด');
            setOpenDialog(true);
          }
        },
        onError: (error) => {
          const err = error;

          setErrorMessage(err.message || 'เกิดข้อผิดพลาด');
          setOpenDialog(true);
        },
      },
    );
  };
  const handleEmailSentClose = () => {
    setEmailSentOpen(false);
  };

  const handleClose = (): void => {
    setOpenSuccess(false);
  };
  return (
    <>
      <LoadingComponent open={isPending} />
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            maxWidth: 'sm',
            margin: 'auto',
          },
        }}
        anchor={'bottom'}
        open={open}
        onClose={() => onClose(undefined)}
      >
        <Box maxWidth={'sm'} minHeight={'70vh'} padding={'1em'}>
          <CreatePasswordComponent
            handleClick={handleSubmit(onSubmit)}
            open={openSuccess}
            onClose={handleClose}
            formControl={formControl}
          />
        </Box>
      </Drawer>
      <SuccessDialog
        title='อีเมลยืนยันถูกส่งแล้ว'
        description='ระบบได้ส่งอีเมลยืนยันไปยังที่อยู่อีเมลของท่านเรียบร้อยแล้ว กรุณาตรวจสอบกล่องจดหมายของท่าน'
        onClose={handleEmailSentClose}
        open={emailSentOpen}
      />
      <ErrorDialog
        title='เกิดข้อผิดพลาด'
        description={errorMessage}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          onClose(undefined);
        }}
        isLink={false}
      />
    </>
  );
}
