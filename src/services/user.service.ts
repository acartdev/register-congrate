import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { Department, User } from '@/model/user.model';
export class UserService {
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const result = await fetch(`/api/users/${user.uuid}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = result.json();
    return data;
  }
  async getMe(): Promise<HttpResponse<User>> {
    const result = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'same-origin',
    });
    const data = result.json();
    return data;
  }
  async createUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const result = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = result.json();
    return data;
  }
  async getDepartment(): Promise<HttpResponse<Department[]>> {
    const result = await fetch('/api/departments', {
      method: 'GET',
      credentials: 'same-origin',
    });
    const data = result.json();
    return data;
  }
}
