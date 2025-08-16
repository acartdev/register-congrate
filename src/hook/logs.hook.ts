'use client';
import { LogsService } from '@/services/logs.service';
import { useQuery } from '@tanstack/react-query';

export const useGetLogs = () => {
  const logsService = new LogsService();
  return useQuery({
    queryKey: ['logs'],
    queryFn: () => logsService.getLogs(),
  });
};
