import { Users } from '@/generated/prisma';
import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { Department, User, UserRole } from '@/model/user.model';
import { UserService } from '@/services/user.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
  const userService = new UserService();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update_user'],
    mutationFn: async (input: RegisterForm): Promise<HttpResponse<string>> =>
      userService.updateUser(input),
    onSuccess: (response: HttpResponse<string>) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['get_me'] });
      }
    },
  });
};

export const useGetMe = () => {
  const userService = new UserService();
  return useQuery({
    queryKey: ['get_me'],
    queryFn: async (): Promise<HttpResponse<User>> => userService.getMe(),
  });
};

export const useGetDepartment = () => {
  const userService = new UserService();
  return useQuery({
    queryKey: ['get_department'],
    queryFn: async (): Promise<HttpResponse<Department[]>> =>
      userService.getDepartment(),
  });
};

import { UseQueryResult } from '@tanstack/react-query';

export const useGetUsersFilter = (
  searchTerm: string,
  role: UserRole,
  deptID: number | undefined,
): UseQueryResult<
  HttpResponse<Array<Users & { department: Department | null }>>,
  Error
> => {
  const userService = new UserService();
  return useQuery({
    queryKey: ['get_users_filter', searchTerm, role, deptID],
    queryFn: async (): Promise<
      HttpResponse<Array<Users & { department: Department | null }>>
    > => userService.getUsersFilter(searchTerm, role, deptID),
  });
};
