import { User } from './user.model';

export interface ListModel {
  id: number;
  name: string;
  description?: string;
  created_at: Date | string;
  updated_at: Date | string;
  attachment: string;
}

export enum CURD {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
export interface LogModel {
  id: number;
  type: CURD;
  message: string;
  userID: string;
  user: User;
  created_at: Date | string;
}
