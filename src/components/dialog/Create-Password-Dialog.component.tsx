import { Box, Drawer } from '@mui/material';
import CreatePasswordComponent from '../Create-Password.component';
import { ModalAction } from '@/model/unity.model';
import { PasswordForm, RegisterForm } from '@/model/form.model';
import { useState } from 'react';
import { fa } from 'zod/v4/locales';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordSchema } from '@/schema/form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash';

export default function CreatePasswordDialog({
  open,
  formData,
  onClose,
}: ModalAction & { formData: RegisterForm }) {
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
    formState: { errors },
  } = formControl;
  const onSubmit: SubmitHandler<PasswordForm> = (data) => {
    if (!isEmpty(errors)) return;
    console.log(data, formData);

    setOpenSuccess(true);
  };

  const handleClose = (): void => {
    setOpenSuccess(false);
  };
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
        <CreatePasswordComponent
          handleClick={handleSubmit(onSubmit)}
          open={openSuccess}
          onClose={handleClose}
          formControl={formControl}
        />
      </Box>
    </Drawer>
  );
}
