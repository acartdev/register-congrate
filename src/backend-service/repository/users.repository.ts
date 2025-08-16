import { Department, PrismaClient } from '@/generated/prisma';
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

  async verifyUser(email: string, uuid: string): Promise<HttpResponse<string>> {
    const client = new PrismaClient();
    try {
      const user = await client.users.update({
        where: { email, uuid },
        data: { isVerified: true },
      });
      if (!user) {
        return { message: 'ไม่พบผู้ใช้', status: 404 };
      }
      return {
        data: user.uuid!,
        message: 'ยืนยันผู้ใช้สำเร็จ กรุณาเข้าสู่ระบบ',
        status: 200,
      };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }
  async getDepartments(): Promise<HttpResponse<Department[]>> {
    const client = new PrismaClient();
    try {
      const departments = await client.department.findMany();
      return { data: departments, status: 200 };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }
}
