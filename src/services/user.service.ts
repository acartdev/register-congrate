import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
export class UserService {
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const result = await fetch(`/users/${user.uuid}`, {
      method: 'PUT',
      credentials: 'same-origin',
    });
    const data = result.json();
    return data;
  }
}
