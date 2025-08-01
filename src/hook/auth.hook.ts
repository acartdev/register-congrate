import axiosInstance from '@/connections/axios.connection';
import { LoginForm } from '@/model/form.model';

async function login(credentials: LoginForm): Promise<string> {
  const res = await axiosInstance.post('/auth/login', credentials);
  return res.data;
}
