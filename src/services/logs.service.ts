import { LogModel } from '@/model/list.model';

export class LogsService {
  async getLogs(): Promise<LogModel[]> {
    const res = await fetch('/api/logs', {
      credentials: 'same-origin',
    });

    return res.json();
  }
}
