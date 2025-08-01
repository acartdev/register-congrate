import { HttpResponse } from '@/model/http.model';
import { UsersRepository } from '../repository/users.repository';
import { RegisterForm } from '@/model/form.model';

export class UsersService {
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const usersRepository = new UsersRepository();
    return usersRepository.updateUser(user);
  }
}
