import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function BubbleComponent() {
  return (
    <>
      <Box
        sx={{
          top: -15,
          left: -15,
          bgcolor: grey[50],
          width: 100,
          height: 100,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          top: -15,
          right: -15,
          bgcolor: grey[50],
          width: 50,
          height: 50,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          bottom: -20,
          right: -20,
          bgcolor: grey[50],
          width: 90,
          height: 90,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          bottom: -25,
          left: -25,
          bgcolor: grey[50],
          width: 130,
          height: 130,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          top: 125,
          left: 25,
          bgcolor: grey[50],
          width: 20,
          height: 20,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          top: 155,
          left: 70,
          bgcolor: grey[50],
          width: 50,
          height: 50,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          top: 70,
          right: 25,
          bgcolor: grey[50],
          width: 80,
          height: 80,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          top: 155,
          right: 70,
          bgcolor: grey[50],
          width: 50,
          height: 50,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
      <Box
        sx={{
          top: -50,
          right: 120,
          bgcolor: grey[50],
          width: 80,
          height: 80,
          opacity: 0.4,
          borderRadius: '50%',
        }}
        position='absolute'
      ></Box>
    </>
  );
}
