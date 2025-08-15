'use client';
import { useSnackStore } from '@/_store/snackStore';
import SnackBarComponent from '@/components/Snackbar.component';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSnackOpen, data, onCloseSnack } = useSnackStore();
  return (
    <>
      {children}
      <SnackBarComponent {...data} open={isSnackOpen} onClose={onCloseSnack} />
    </>
  );
}
