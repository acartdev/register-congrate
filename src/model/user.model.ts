import { NamePrefix } from './form.model';

export interface User {
  userID: string;
  prefix: NamePrefix;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  department: DepartmentModel;
  password?: string;
  role?: UserRole;
}

export interface DepartmentModel {
  id: number;
  name: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  STAFF = 'STAFF',
}
