import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { Department, User } from '@/model/user.model';
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
