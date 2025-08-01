import 'server-only';
import { AuthRepository } from '../repository/auth.repository';
import { PasswordForm, RegisterForm } from '@/model/form.model';
import { isEmpty } from 'lodash';
import { HttpResponse } from '@/model/http.model';
import { User } from '@/model/user.model';
export class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  async register(
    register: RegisterForm & PasswordForm,
  ): Promise<HttpResponse<string>> {
    const userExists = await this.authRepository.checkUserExists(
      register.userID,
    );
    if (userExists) {
      return {
        status: 400,
        message: 'ผู้ใช้งานนี้มีอยู่แล้ว',
        error: 'Bad Request',
      };
    }
    if (register.password !== register.confirmPassword) {
      return {
        status: 400,
        message: 'รหัสผ่านไม่ตรงกัน',
        error: 'Bad Request',
      };
    }
    const res = await this.authRepository.register(register);
    return {
      status: 200,
      message: 'ลงทะเบียนสำเร็จ',
    };
  }
  async login(credentials: {
    userID: string;
    password: string;
  }): Promise<HttpResponse<User>> {
    const res = await this.authRepository.login(credentials);
    if (!isEmpty(res)) {
      return {
        status: 200,
        message: 'เข้าสู่ระบบสำเร็จ',
        data: res,
      };
    }
    return {
      status: 401,
      message: 'เข้าสู่ระบบล้มเหลว',
      error: 'Unauthorized',
    };
  }
}
