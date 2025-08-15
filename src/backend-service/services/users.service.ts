import { HttpResponse } from '@/model/http.model';
import { UsersRepository } from '../repository/users.repository';
import { RegisterForm } from '@/model/form.model';
import { verifyRefreshToken } from '@/helper/jwt.helper';

export class UsersService {
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const usersRepository = new UsersRepository();
    return usersRepository.updateUser(user);
  }
  async verifyUser(token: string): Promise<HttpResponse<string>> {
    const usersRepository = new UsersRepository();
    const data = verifyRefreshToken(token);
    const email = data!.email;
    const uuid = data!.userID;
    return usersRepository.verifyUser(email, uuid);
  }
}
