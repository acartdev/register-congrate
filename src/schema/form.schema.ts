import { z } from 'zod'; // Add new import
export const LoginSchemaModel = z.object({
  userID: z
    .string()
    .min(1, 'กรุณากรอกรหัสนักศีกษา หรือ รหัสอาจารย์')
    .regex(RegExp('^[0-9]*$'), 'รหัสนักศีกษา หรือ รหัสอาจารย์ควรเป็นตัวเลข'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
});
export type LoginSchema = z.infer<typeof LoginSchemaModel>;
