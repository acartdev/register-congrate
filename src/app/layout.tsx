import type { Metadata, Viewport } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme/theme';

const kanit = Kanit({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-kanit',
});
export const metadata: Metadata = {
  title: 'ระบบลงทะเบียนรับปริญญา',
  description: 'ระบบลงทะเบียนรับปริญญา และซ้อมรับปริญญา',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={kanit.variable}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
