import axiosInstance from '@/connections/axios.connection';
import { LoginForm, RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { User } from '@/model/user.model';

export class AuthService {
  constructor() {}
  async register(register: RegisterForm): Promise<User> {
    const res = await axiosInstance.post('/auth/register', register);
    return res.data;
  }

  async login(credentials: LoginForm): Promise<HttpResponse<string>> {
    const res = await axiosInstance.post('/auth/login', credentials);
    return res.data;
  }

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  }

  async refreshToken(): Promise<HttpResponse<string>> {
    const res = await axiosInstance.post('/auth/refresh');
    return res.data;
  }
}
