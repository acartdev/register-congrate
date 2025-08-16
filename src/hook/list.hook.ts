import { HttpResponse } from '@/model/http.model';
import { ListModel } from '@/model/list.model';
import { ListService } from '@/services/list.service';
import { useQuery } from '@tanstack/react-query';

export const useGetList = (search: string = '') => {
  const listService = new ListService();
  return useQuery({
    queryKey: ['get_list', search],
    queryFn: async (): Promise<HttpResponse<ListModel[]>> =>
      listService.getList(search),
  });
};
