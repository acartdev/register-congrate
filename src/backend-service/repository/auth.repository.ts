import { PrismaClient, Users } from '@/generated/prisma';
import { RegisterForm } from '@/model/form.model';

export class AuthRepository {
  async register(
    register: RegisterForm & { password: string },
  ): Promise<Users | null> {
    const client = new PrismaClient();
    const user = await client.users.create({
      data: register,
    });
    return user;
  }
  async getUserByUserId(userID: string): Promise<Users | null> {
    const client = new PrismaClient();
    const result = await client.users.findFirst({
      where: {
        userID: userID,
      },
    });
    return result;
  }
  async checkUserExists(register: RegisterForm): Promise<boolean> {
    const client = new PrismaClient();
    const result = await client.users.findFirst({
      where: {
        OR: [
          {
            userID: register.userID,
            email: register.email,
          },
        ],
      },
    });
    return !!result;
  }
}
