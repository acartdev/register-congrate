import { Activity, PrismaClient, RegisterActivity } from '@/generated/prisma';
import { HttpResponse } from '@/model/http.model';

export class ListsRepository {
  async findAll(search: string): Promise<HttpResponse<Activity[]>> {
    const client = new PrismaClient();

    try {
      const activities = await client.activity.findMany({
        where: {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        },
      });
      return { data: activities, status: 200 };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการค้นหากิจกรรม', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }

  async findByUserID(
    search: string,
    userID: number,
  ): Promise<HttpResponse<RegisterActivity[]>> {
    const client = new PrismaClient();
    try {
      const activities = await client.registerActivity.findMany({
        where: {
          user_id: userID,
          activity: {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          },
        },
        include: {
          activity: true,
        },
      });
      return { data: activities, status: 200 };
    } catch {
      return { message: 'เกิดข้อผิดพลาดในการค้นหากิจกรรม', status: 500 };
    } finally {
      await client.$disconnect();
    }
  }
}
