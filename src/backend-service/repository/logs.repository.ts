import { Logs, PrismaClient } from '@/generated/prisma';

export class LogsRepository {
  async create(data: Omit<Logs, 'id'>): Promise<Logs> {
    const client = new PrismaClient();
    try {
      return await client.logs.create({
        data,
      });
    } catch (error) {
      throw new Error('Error creating log');
    } finally {
      await client.$disconnect();
    }
  }

  async findAll(deptID: number): Promise<Logs[]> {
    const client = new PrismaClient();
    try {
      return await client.logs.findMany({
        where: {
          deptID: deptID,
        },
      });
    } catch (error) {
      throw new Error('Error fetching logs');
    } finally {
      await client.$disconnect();
    }
  }
}
