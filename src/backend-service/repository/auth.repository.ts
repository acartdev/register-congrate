import { RegisterForm } from '@/model/form.model';
import { User } from '@/model/user.model';

export class AuthRepository {
  async register(register: RegisterForm): Promise<User | null> {
    return null;
  }
  async login(credentials: {
    userID: string;
    password: string;
  }): Promise<User | null> {
    return null;
  }
  async checkUserExists(userID: string): Promise<boolean> {
    return false;
  }
}
