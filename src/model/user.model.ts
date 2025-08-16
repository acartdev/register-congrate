import { NamePrefix } from './form.model';

export interface User {
  uuid: string;
  userID: string;
  prefix: NamePrefix;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  deptID: number;
  role?: UserRole;
  permit?: Permission;
  created_at: Date | string;
  updated_at: Date | string;
  password?: string;
  department?: string;
}

export interface DepartmentModel {
  id: number;
  name: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export enum Permission {
  ADMIN = 'ADMIN',
  STAFF_TEACHER = 'STAFF_TEACHER',
  STAFF_STUDENT = 'STAFF_STUDENT',
  VIEW = 'VIEW',
}

export interface Department {
  id: number;
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
}
