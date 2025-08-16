import { Users } from '@/generated/prisma';
import { RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import { Department, User, UserRole } from '@/model/user.model';
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
  async register(user: RegisterForm): Promise<HttpResponse<string>> {
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
  async createUser(user: RegisterForm): Promise<HttpResponse<string>> {
    const result = await fetch('/api/users', {
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

  async getUsersFilter(
    searchTerm: string,
    role: UserRole,
    deptID: number | undefined,
  ): Promise<HttpResponse<Array<Users & { department: Department | null }>>> {
    let query = `/api/users?role=${role}&q=${searchTerm}`;
    if (deptID) {
      query += `&deptID=${deptID}`;
    }
    const result = await fetch(query, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const data = result.json();
    return data;
  }

  async createPassword(input: {
    password: string;
    confirmPassword: string;
    token: string;
  }): Promise<HttpResponse<string>> {
    const result = await fetch('/api/auth/create-password', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = result.json();
    return data;
  }
  async getUserByUUID(uuid: string): Promise<HttpResponse<User>> {
    const result = await fetch(`/api/users/${uuid}`, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const data = result.json();
    return data;
  }
  async deleteUser(uuid: string): Promise<HttpResponse<void>> {
    const result = await fetch(`/api/users/${uuid}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
    const data = result.json();
    return data;
  }
}
