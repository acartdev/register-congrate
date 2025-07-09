'use client';
import { Box, Divider, Typography } from '@mui/material';
import { BarChart, PieValueType } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

export default function DashboardPage() {
  const data: readonly PieValueType[] = [
    { label: 'ลงทะเบียนแล้ว', value: 5, color: '#00e676' },
    { label: 'ยังไม่ลงทะเบียน', value: 30, color: '#bdbdbd' },
  ];

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: false,
    fontSize: 16,
  };

  return (
    <Box>
      <Typography fontSize={18}>อัตราการลงทะเบียน</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <PieChart
        series={[
          { innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' },
        ]}
        {...settings}
      />
      <Box height={25} />
      <Typography fontSize={18}>แนวโนมการลงทะเบียน</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <BarChart
        colors={['#00e676']}
        xAxis={[{ data: ['ม.ค', 'ก.พ', 'ส.ค'] }]}
        series={[{ data: [4, 8, 6] }]}
        height={300}
      />
    </Box>
  );
}
