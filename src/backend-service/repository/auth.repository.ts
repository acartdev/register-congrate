import { PrismaClient, Users } from '@/generated/prisma';
import { RegisterForm } from '@/model/form.model';

export class AuthRepository {
  async register(
    register: RegisterForm & { password: string },
  ): Promise<{ uuid: string | null; email: string } | null> {
    const client = new PrismaClient();
    try {
      const user = await client.users.create({
        data: register,
        select: {
          uuid: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    } finally {
      await client.$disconnect();
    }
  }
  async getUserByUserId(userID: string): Promise<Users | null> {
    const client = new PrismaClient();
    try {
      const user = await client.users.findUnique({
        where: { uuid: userID },
      });
      return user;
    } catch {
      return null;
    } finally {
      await client.$disconnect();
    }
  }
  async checkUserExists(register: RegisterForm): Promise<boolean> {
    const client = new PrismaClient();
    try {
      const result = await client.users.findFirst({
        where: {
          OR: [
            {
              userID: register.userID,
            },
            {
              email: register.email,
            },
          ],
        },
      });
      return !!result;
    } catch {
      return false;
    } finally {
      await client.$disconnect();
    }
  }
}
