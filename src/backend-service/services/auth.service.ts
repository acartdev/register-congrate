import 'server-only';
import { AuthRepository } from '../repository/auth.repository';
import { PasswordForm, RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import bcrypt from 'bcrypt';
import { Users } from '@/generated/prisma';
export class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  async register(
    register: RegisterForm & PasswordForm,
  ): Promise<HttpResponse<string>> {
    const userExists = await this.authRepository.checkUserExists(register);
    if (userExists) {
      return {
        status: 409,
        message: 'ผู้ใช้งานนี้มีอยู่แล้ว',
        error: 'Conflict',
      };
    }
    if (register.password !== register.confirmPassword) {
      return {
        status: 400,
        message: 'รหัสผ่านไม่ตรงกัน',
        error: 'Bad Request',
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = register;
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    await this.authRepository.register(userData);
    return {
      status: 200,
      message: 'ลงทะเบียนสำเร็จ',
    };
  }

  async getUserById(userID: string): Promise<Omit<Users, 'password'> | null> {
    try {
      const user = await this.authRepository.getUserByUserId(userID);
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = user;
        return userData;
      }
      return null;
    } catch {
      return null;
    }
  }
}
