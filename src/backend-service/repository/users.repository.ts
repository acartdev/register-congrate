import { Department, PrismaClient, Users } from '@/generated/prisma';
import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { UserRole } from '@/model/user.model';

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
  async getUsersFilter(
    searchTerm: string,
    role: UserRole,
    deptID: string | undefined,
  ): Promise<HttpResponse<Array<Users & { department: Department | null }>>> {
    const client = new PrismaClient();
    try {
      const query = {};
      if (role) {
        Object.assign(query, { role });
      } else {
        return { message: 'กรุณาเลือกบทบาทผู้ใช้', status: 400 };
      }
      if (deptID) {
        Object.assign(query, { deptID: +deptID });
      }
      if (searchTerm.trim() !== '') {
        Object.assign(query, {
          OR: [
            { firstName: { contains: searchTerm } },
            { lastName: { contains: searchTerm } },
            { email: { contains: searchTerm } },
            { userID: { contains: searchTerm } },
          ],
        });
      }
      const users = await client.users.findMany({
        where: query,
        include: {
          department: {
            select: {
              id: true,
              name: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
        orderBy: [{ created_at: 'desc' }],
      });
      return { data: users, status: 200 };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }

  async createUser(input: RegisterForm): Promise<HttpResponse<string>> {
    const client = new PrismaClient();

    try {
      const user = await client.users.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          userID: input.userID,
          deptID: input.deptID,
          role: input.role,
          prefix: input.prefix,
          password: '',
        },
      });
      return { data: user.uuid!, message: 'สร้างผู้ใช้สำเร็จ', status: 201 };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }

  async updateUserByUUID(
    uuid: string,
    data: RegisterForm,
  ): Promise<HttpResponse<string>> {
    const client = new PrismaClient();
    try {
      const updatedUser = await client.users.update({
        where: { uuid },
        data,
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
