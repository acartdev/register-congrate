'use client';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { waitVerifyMock } from '@/data/mock';
import { blue, green, orange, red, yellow } from '@mui/material/colors';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const theme = useTheme();

  // Calculate statistics from mock data
  const stats = useMemo(() => {
    const registered = waitVerifyMock.filter(
      (user) => user.verificationStatus === 'approved',
    ).length;
    const notRegistered = waitVerifyMock.filter(
      (user) => user.verificationStatus === 'pending',
    ).length;
    const rejected = waitVerifyMock.filter(
      (user) => user.verificationStatus === 'rejected',
    ).length;
    const total = waitVerifyMock.length;

    return {
      registered,
      notRegistered,
      rejected,
      total,
    };
  }, []);

  // Registration trends data (mock monthly data)
  const registrationTrendsOptions = {
    chart: {
      type: 'line' as const,
      toolbar: { show: false },
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    tooltip: {
      theme: 'light',
    },
  };

  const registrationTrendsSeries = [
    {
      name: 'ลงทะเบียนแล้ว',
      data: [10, 25, 45, 60, 80, 95],
    },
  ];

  // Participation trends (donut chart)
  const participationOptions = {
    chart: {
      type: 'donut' as const,
      background: 'transparent',
    },
    labels: ['ลงทะเบียนแล้ว', 'รอการอนุมัติ', 'ถูกปฏิเสธ'],
    colors: [green.A200, green.A700, yellow.A700, red.A400],
    legend: {
      position: 'bottom' as const,
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    tooltip: {
      theme: 'light',
    },
  };

  const participationSeries = [
    stats.registered,
    stats.notRegistered,
    stats.rejected,
  ];

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        แดชบอร์ดการลงทะเบียน
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{
              background: `linear-gradient(45deg, ${green.A700}, ${green.A200})`,
              color: 'white',
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant='h6'
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                ลงทะเบียนแล้ว
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 'bold',
                }}
              >
                {stats.registered}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{
              background: `linear-gradient(45deg, ${orange.A700}, ${orange.A200})`,
              color: 'white',
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant='h6'
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                รอการอนุมัติ
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 'bold',
                }}
              >
                {stats.notRegistered}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{
              background: `linear-gradient(45deg, ${blue.A700}, ${blue.A200})`,
              color: 'white',
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant='h6'
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                นักศึกษาทั้งหมด
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 'bold',
                }}
              >
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.light})`,
              color: 'white',
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant='h6'
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                ถูกปฏิเสธ
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 'bold',
                }}
              >
                {stats.rejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        {/* Registration Trends */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, height: { xs: 300, sm: 400 } }}>
            <Typography variant='h6' gutterBottom>
              แนวโน้มการลงทะเบียน
            </Typography>
            <Box sx={{ height: { xs: 250, sm: 320 } }}>
              <Chart
                options={registrationTrendsOptions}
                series={registrationTrendsSeries}
                type='line'
                height='100%'
              />
            </Box>
          </Paper>
        </Grid>

        {/* Participation Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: { xs: 300, sm: 400 } }}>
            <Typography variant='h6' gutterBottom>
              สัดส่วนการมีส่วนร่วม
            </Typography>
            <Box sx={{ height: { xs: 250, sm: 320 } }}>
              <Chart
                options={participationOptions}
                series={participationSeries}
                type='donut'
                height='100%'
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
