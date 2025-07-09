import { NamePrefix } from '@/model/form.model';
import { z } from 'zod'; // Add new import
export const LoginSchemaModel = z.object({
  userID: z
    .string()
    .min(1, 'กรุณากรอกรหัสนักศีกษา หรือ รหัสอาจารย์')
    .regex(RegExp('^[0-9]*$'), 'รหัสนักศีกษา หรือ รหัสอาจารย์ควรเป็นตัวเลข'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
});

export const RegisterSchema = z.object({
  userID: z
    .string()
    .min(1, 'กรุณากรอกรหัสนักศีกษา หรือ รหัสอาจารย์')
    .regex(RegExp('^[0-9]*$'), 'รหัสนักศีกษา หรือ รหัสอาจารย์ควรเป็นตัวเลข'),
  prefix: z.nativeEnum(NamePrefix),
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  phone: z
    .string()
    .transform((e) => (e === '' ? undefined : e))
    .refine(
      (val) => {
        if (val !== undefined) {
          if (val.length < 10) {
            return false;
          }
          if (val.length > 10) {
            return false;
          }
          if (!/^[0-9]*$/.test(val)) {
            return false;
          }
        }
        return true;
      },
      {
        message: 'เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องเป็นตัวเลข 10 ตัว)',
        path: ['phone'],
      },
    )
    .optional(),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').min(1, 'กรุณากรอกอีเมล'),
  deptID: z.number(),
});

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'รหัสผ่านต้องมีอย่าน้อย 8 ตัว')
      .max(20, 'รหัสผ่านต้องมีไม่เกิน 20 ตัว'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'รหัสผ่านไม่ตรงกัน',
  });

export const EmailSchema = z.object({
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').min(1, 'กรุณากรอกอีเมล'),
});
