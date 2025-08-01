import { PrismaClient } from '@/generated/prisma';
import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';

export class UsersRepository {
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const client = new PrismaClient();
    try {
      const updatedUser = await client.users.update({
        where: { uuid: user.uuid },
        data: user,
      });
      return {
        data: updatedUser.uuid!,
        message: 'อัปเดตผู้ใช้สำเร็จ',
        status: 200,
      };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }
}
