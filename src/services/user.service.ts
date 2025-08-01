import api from '@/connections/axios.connection';
import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
export class UserService {
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const result = await api.put(`/users/${user.uuid}`, user);
    return result.data;
  }
}
