'use client';

import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { buttonBgLinear } from '@/theme/utils';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { qrCodeSchema, QRCodeFormData } from '@/schemas/form.schema';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';
interface QRCodeFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<QRCodeFormData>;
  onSubmit: (data: QRCodeFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export default function QRCodeForm({
  mode,
  initialData,
  onSubmit,
  onDelete,
}: QRCodeFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<QRCodeFormData>({
    resolver: zodResolver(qrCodeSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      startDate: initialData?.startDate || null,
      endDate: initialData?.endDate || null,
      attachment: initialData?.attachment || null,
    },
  });

  const attachment = watch('attachment');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('attachment', file);
    }
  };

  const handleRemoveFile = () => {
    setValue('attachment', null);
  };

  const handleFormSubmit = async (data: QRCodeFormData) => {
    try {
      await onSubmit(data);
      if (mode === 'create') {
        reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      const confirmed = window.confirm(
        'คุณแน่ใจหรือไม่ว่าต้องการลบ QR Code นี้?',
      );
      if (confirmed) {
        try {
          await onDelete();
        } catch (error) {
          console.error('Error deleting QR code:', error);
        }
      }
    }
  };

  const title = mode === 'create' ? 'สร้าง QR Code' : 'แก้ไข QR Code';
  const submitButtonText =
    mode === 'create' ? 'สร้าง QR Code' : 'บันทึกการแก้ไข';
  const loadingText = mode === 'create' ? 'กำลังสร้าง...' : 'กำลังบันทึก...';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton LinkComponent={Link} href='/list'>
            <ArrowBackIosIcon />
          </IconButton>{' '}
          <Typography>{title}</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Card>
          <CardContent>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit(handleFormSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='ชื่อ'
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='คำอธิบาย'
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name='startDate'
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label='วันที่เริ่มต้น'
                        minDate={dayjs()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.startDate,
                            helperText:
                              typeof errors.startDate?.message === 'string'
                                ? errors.startDate.message
                                : '',
                            required: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name='endDate'
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label='วันที่สิ้นสุด'
                        minDate={dayjs()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.endDate,
                            helperText: errors.endDate?.message?.toString(),
                            required: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <Typography variant='body2' color='text.secondary'>
                      แนบไฟล์ (ไม่จำเป็น)
                    </Typography>

                    {attachment ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                        }}
                      >
                        <AttachFileIcon color='primary' />
                        <Typography variant='body2' sx={{ flex: 1 }}>
                          {attachment.name}
                        </Typography>
                        <IconButton
                          size='small'
                          onClick={handleRemoveFile}
                          color='error'
                        >
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        component='label'
                        variant='outlined'
                        startIcon={<CloudUploadIcon />}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        อัปโหลดไฟล์
                        <input
                          type='file'
                          hidden
                          onChange={handleFileUpload}
                          accept='image/*,.pdf,.doc,.docx,.txt'
                        />
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent:
                    mode === 'edit' ? 'space-between' : 'flex-end',
                  mt: 2,
                }}
              >
                {mode === 'edit' && onDelete && (
                  <Button
                    type='button'
                    variant='outlined'
                    color='error'
                    onClick={handleDelete}
                    startIcon={<DeleteIcon />}
                  >
                    ลบ
                  </Button>
                )}

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type='button'
                    variant='outlined'
                    onClick={() => reset()}
                  >
                    {mode === 'create' ? 'ล้างข้อมูล' : 'รีเซ็ต'}
                  </Button>

                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting}
                    sx={{
                      ...buttonBgLinear,
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                    }}
                  >
                    {isSubmitting ? loadingText : submitButtonText}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}
