import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { UserService } from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
