'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QRCodeForm from '@/components/QRCodeForm.component';
import { QRCodeFormData } from '@/schemas/form.schema';
import dayjs from 'dayjs';
import { Backdrop, CircularProgress } from '@mui/material';
import { QRCodeData } from '@/model/form.model';

export default function QRCodePage() {
  const params = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<QRCodeFormData | null>(null);
  const [loading, setLoading] = useState(true);

  const isEditMode = params.slug !== 'create';

  useEffect(() => {
    if (isEditMode) {
      // TODO: Fetch existing QR code data by ID
      fetchQRCodeData(params.slug as string);
    } else {
      setLoading(false);
    }
  }, [params.slug, isEditMode]);

  const fetchQRCodeData = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for demonstration
      const mockData: QRCodeData = {
        id,
        name: 'Sample QR Code',
        description: 'This is a sample QR code description',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        attachment: null,
      };

      setInitialData({
        name: mockData.name,
        description: mockData.description,
        startDate: dayjs(mockData.startDate),
        endDate: dayjs(mockData.endDate),
        attachment: mockData.attachment,
      });
    } catch (error) {
      console.error('Error fetching QR code data:', error);
      alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: QRCodeFormData) => {
    try {
      if (isEditMode) {
        // TODO: Update existing QR code
        console.log('Updating QR code:', { id: params.slug, data });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert('แก้ไข QR Code สำเร็จ!');
        router.push('/list'); // Redirect to list page
      } else {
        // TODO: Create new QR code
        console.log('Creating QR code:', data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert('สร้าง QR Code สำเร็จ!');
        router.push('/list'); // Redirect to list page
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = isEditMode
        ? 'เกิดข้อผิดพลาดในการแก้ไข QR Code'
        : 'เกิดข้อผิดพลาดในการสร้าง QR Code';
      alert(errorMessage);
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: Delete QR code
      console.log('Deleting QR code:', params.slug);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('ลบ QR Code สำเร็จ!');
      router.push('/list'); // Redirect to list page
    } catch (error) {
      console.error('Error deleting QR code:', error);
      alert('เกิดข้อผิดพลาดในการลบ QR Code');
    }
  };

  if (loading) {
    return (
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Backdrop>
    );
  }

  return (
    <QRCodeForm
      mode={isEditMode ? 'edit' : 'create'}
      initialData={initialData || undefined}
      onSubmit={handleSubmit}
      onDelete={isEditMode ? handleDelete : undefined}
    />
  );
}
