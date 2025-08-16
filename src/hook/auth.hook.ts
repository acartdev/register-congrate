import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { UserService } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  const userService = new UserService();
  return useMutation({
    mutationKey: ['create_user'],
    mutationFn: async (input: RegisterForm): Promise<HttpResponse<string>> =>
      userService.register(input),
  });
};

export const useCreatePassword = () => {
  const userService = new UserService();
  return useMutation({
    mutationKey: ['create_password'],
    mutationFn: async (input: {
      password: string;
      confirmPassword: string;
      token: string;
    }): Promise<HttpResponse<string>> => userService.createPassword(input),
  });
};
