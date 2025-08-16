import { z } from 'zod';
import dayjs from 'dayjs';

export const qrCodeSchema = z
  .object({
    name: z.string().min(1, 'กรุณาใส่ชื่อ'),
    description: z.string().min(1, 'กรุณาใส่คำอธิบาย'),
    startDate: z
      .instanceof(dayjs as any)
      .nullable()
      .refine((date) => date !== null, 'กรุณาเลือกวันที่เริ่มต้น'),
    endDate: z
      .instanceof(dayjs as any)
      .nullable()
      .refine((date) => date !== null, 'กรุณาเลือกวันที่สิ้นสุด'),
    attachment: z
      .union([z.string(), z.instanceof(File)])
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate.isAfter(data.startDate);
      }
      return true;
    },
    {
      message: 'วันที่สิ้นสุดต้องมากกว่าวันที่เริ่มต้น',
      path: ['endDate'],
    },
  );

export type QRCodeFormData = z.infer<typeof qrCodeSchema>;
