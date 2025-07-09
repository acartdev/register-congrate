import { NamePrefix } from '@/model/form.model';
import { ListModel } from '@/model/list.model';
import { User } from '@/model/user.model';

export const listMock: ListModel[] = [
  {
    id: 1,
    name: 'ซ้อมรับปริญญารับปริญญาใจ รับปริญญาใจ รับปริญญาใจรับปริญญาใจรับปริญญาใจ',
    attachment:
      'https://images.unsplash.com/photo-1751535076133-716cb28df027?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    created_at: new Date(),
    updated_at: new Date(),
    description: 'รับปริญญาใจ',
  },
  {
    id: 2,
    name: 'ซ้อมรับปริญญา',
    attachment:
      'https://images.unsplash.com/photo-1751535076133-716cb28df027?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    created_at: new Date(),
    updated_at: new Date(),
    description: 'รับปริญญาใจ',
  },
  {
    id: 3,
    name: 'ซ้อมรับปริญญา',
    attachment:
      'https://images.unsplash.com/photo-1751535076133-716cb28df027?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    created_at: new Date(),
    updated_at: new Date(),
    description: 'รับปริญญาใจ',
  },
];

export const mockUser: User = {
  prefix: NamePrefix.MR,
  deptID: 1,
  firstName: 'ธนภัทร',
  lastName: 'กองเงิน',
  userID: '65309010013',
  email: 'example@email.com',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockUsers: User[] = [
  {
    prefix: NamePrefix.MR,
    deptID: 1,
    firstName: 'ธนภัทร',
    lastName: 'กองเงิน',
    userID: '65309010013',
    email: 'example@email.com',
    created_at: new Date(),
    updated_at: new Date(),
    department: 'เทคโนโลยีสารสนเทศ',
  },
  {
    prefix: NamePrefix.MR,
    deptID: 1,
    firstName: 'ธนภัทร',
    lastName: 'กองเงิน',
    userID: '65309010013',
    email: 'example@email.com',
    created_at: new Date(),
    updated_at: new Date(),
    department: 'เทคโนโลยีสารสนเทศ',
  },
  {
    prefix: NamePrefix.MR,
    deptID: 1,
    firstName: 'ธนภัทร',
    lastName: 'กองเงิน',
    userID: '65309010013',
    email: 'example@email.com',
    created_at: new Date(),
    updated_at: new Date(),
    department: 'เทคโนโลยีสารสนเทศ',
  },
  {
    prefix: NamePrefix.MR,
    deptID: 1,
    firstName: 'ธนภัทร',
    lastName: 'กองเงิน',
    userID: '65309010013',
    email: 'example@email.com',
    created_at: new Date(),
    updated_at: new Date(),
    department: 'เทคโนโลยีสารสนเทศ',
  },
  {
    prefix: NamePrefix.MR,
    deptID: 1,
    firstName: 'ธนภัทร',
    lastName: 'กองเงิน',
    userID: '65309010013',
    email: 'example@email.com',
    created_at: new Date(),
    updated_at: new Date(),
    department: 'เทคโนโลยีสารสนเทศ',
  },
  {
    prefix: NamePrefix.MR,
    deptID: 1,
    firstName: 'ธนภัทร',
    lastName: 'กองเงิน',
    userID: '65309010013',
    email: 'example@email.com',
    created_at: new Date(),
    updated_at: new Date(),
    department: 'เทคโนโลยีสารสนเทศ',
  },
];
