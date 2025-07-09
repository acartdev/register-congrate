import { ReactNode } from 'react';
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
  email: string;
  deptID: number;
  phone?: string;
}

export interface PasswordForm {
  password: string;
  confirmPassword: string;
}

export interface RegisterFormProps {
  formControl: UseFormReturn<RegisterForm>;
}

export interface TableListProps {
  heads: TableHeadModel[];
}

export interface TableHeadModel {
  value: string;
  align?: 'center' | 'right' | 'left' | 'inherit' | 'justify';
}

export interface SearchProps {
  placholder: string;
}
