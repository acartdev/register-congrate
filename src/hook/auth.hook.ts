'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { LoginForm, RegisterForm, PasswordForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import axiosInstance from '@/connections/axios.connection';
import { useRouter } from 'next/navigation';

const authService = new AuthService();

// Get current user from token verification
const getCurrentUser = async (): Promise<RegisterForm | null> => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data.data;
  } catch {
    return null;
  }
};

// Authentication hooks
export const useAuth = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['get_me'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    refetch,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (credentials: LoginForm) => authService.login(credentials),
    onSuccess: (response: HttpResponse<string>) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        router.push('/');
      }
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (
      registerForm: RegisterForm & PasswordForm,
    ): Promise<HttpResponse<string>> => authService.register(registerForm),
    onSuccess: (response: HttpResponse<string>) => {
      if (response.status === 201) {
        router.push('/login');
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: () => {
      queryClient.clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    },
  });
};
