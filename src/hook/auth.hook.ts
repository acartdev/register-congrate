import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { UserService } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  const userService = new UserService();
  return useMutation({
    mutationKey: ['create_user'],
    mutationFn: async (input: RegisterForm): Promise<HttpResponse<string>> =>
      userService.createUser(input),
  });
};
