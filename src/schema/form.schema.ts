import { NamePrefix } from '@/model/form.model';
import { z } from 'zod'; // Add new import
export const LoginSchemaModel = z.object({
  userID: z
    .string()
    .min(1, 'กรุณากรอกรหัสนักศีกษา หรือ รหัสอาจารย์')
    .regex(RegExp('^[0-9]*$'), 'รหัสนักศีกษา หรือ รหัสอาจารย์ควรเป็นตัวเลข'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
});

export const RegisterSchema = z
  .object({
    userID: z
      .string()
      .min(1, 'กรุณากรอกรหัสนักศีกษา หรือ รหัสอาจารย์')
      .regex(RegExp('^[0-9]*$'), 'รหัสนักศีกษา หรือ รหัสอาจารย์ควรเป็นตัวเลข'),
    prefix: z.nativeEnum(NamePrefix),
    firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
    lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
    phone: z
      .string()
      .regex(RegExp('^[0-9]*$'), 'เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น'),
    email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
    deptID: z.number(),
    password: z
      .string()
      .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
      .max(20, 'รหัสผ่านต้องไม่เกิน 20 ตัว'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  });
