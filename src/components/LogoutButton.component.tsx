'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useLogout } from '@/hook/auth.hook';
import { ExitToApp } from '@mui/icons-material';

interface LogoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  showIcon?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  showIcon = true,
  children,
  ...props
}) => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Button
      {...props}
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      startIcon={showIcon ? <ExitToApp /> : undefined}
    >
      {children || 'ออกจากระบบ'}
    </Button>
  );
};