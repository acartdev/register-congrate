import { RegisterForm } from '@/model/form.model';
import { User } from '@/model/user.model';

export class AuthRepository {
  async register(register: RegisterForm): Promise<User> {}
}
