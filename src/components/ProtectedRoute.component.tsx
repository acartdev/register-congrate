'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/hook/auth.hook';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallback,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      fallback || (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='200px'
          flexDirection='column'
          gap={2}
        >
          <CircularProgress />
          <Typography>กำลังโหลด...</Typography>
        </Box>
      )
    );
  }

  if (!isAuthenticated) {
    return null; // Router will handle redirect
  }

  // Check role permissions if specified
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='200px'
        flexDirection='column'
        gap={2}
      >
        <Typography variant='h6' color='error'>
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          กรุณาติดต่อผู้ดูแลระบบ
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};