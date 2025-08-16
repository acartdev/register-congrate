import { CURD, Logs } from '@/generated/prisma';
import { LogsRepository } from '../repository/logs.repository';

export class LogsService {
  async saveLogs(deptID: number, message: string, action: CURD): Promise<void> {
    const logsRepository = new LogsRepository();
    try {
      const data = {
        deptID: deptID,
        type: action,
        created_at: new Date(),
        message: message,
        updated_at: new Date(),
      };
      await logsRepository.create(data);
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  }
  async getLogs(deptID: number): Promise<Logs[]> {
    const logsRepository = new LogsRepository();
    try {
      return await logsRepository.findAll(deptID);
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw new Error('Error fetching logs');
    }
  }
}
