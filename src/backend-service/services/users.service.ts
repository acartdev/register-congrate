import { HttpResponse } from '@/model/http.model';
import { UsersRepository } from '../repository/users.repository';
import { RegisterForm } from '@/model/form.model';
import { verifyRefreshToken } from '@/helper/jwt.helper';
import { Department, Users } from '@/generated/prisma';
import { UserRole } from '@/model/user.model';

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
  async getDepartments(): Promise<HttpResponse<Department[]>> {
    const usersRepository = new UsersRepository();
    return usersRepository.getDepartments();
  }
  async getUsersFilter(
    searchTerm: string,
    role: UserRole,
  ): Promise<HttpResponse<Users[]>> {
    const usersRepository = new UsersRepository();
    return usersRepository.getUsersFilter(searchTerm, role);
  }
}
