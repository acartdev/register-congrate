import { UseFormReturn } from 'react-hook-form';

export enum NamePrefix {
  MR = 'นาย',
  MS = 'นางสาว',
}

export const passwordHint = 'รหัสผ่านต้องมีอย่างน้อย 8 ถึง 20 ตัวอักษร';

export interface LoginForm {
  userID: string;
  password: string;
}

export interface RegisterForm {
  userID: string;
  prefix: NamePrefix;
  firstName: string;
  lastName: string;
  password: string;
  email: string;

  confirmPassword: string;
  deptID: number;
  phone: string;
}

export interface RegisterFormProps {
  formControl: UseFormReturn<RegisterForm>;
}
