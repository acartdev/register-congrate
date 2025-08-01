import 'server-only';
import { AuthRepository } from '../repository/auth.repository';
import { PasswordForm, RegisterForm } from '@/model/form.model';
import { isEmpty } from 'lodash';
import { HttpResponse } from '@/model/http.model';
import {
  generateAccessToken,
  generateRefreshToken,
  JWTPayload,
  verifyRefreshToken,
} from '@/helper/jwt.helper';
import { AuthTokens } from '@/model/auth.model';
import bcrypt from 'bcrypt';
import { UserRole } from '@/model/user.model';
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

  async login(credentials: {
    userID: string;
    password: string;
  }): Promise<HttpResponse<AuthTokens>> {
    try {
      const res = await this.authRepository.getUserByUserId(credentials.userID);
      if (!isEmpty(res)) {
        const comparePassword = await bcrypt.compare(
          credentials.password,
          res.password!,
        );
        if (!comparePassword) {
          return {
            status: 401,
            message:
              'เข้าสู่ระบบล้มเหลว เนื่องจากรหัสผ่านหรือชื่อผู้ใช้งานไม่ถูกต้อง',
            error: 'Unauthorized',
          };
        }
        const payload: JWTPayload = {
          userID: res.userID,
          role: res.role as UserRole,
          email: res.email,
        };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return {
          status: 200,
          message: 'เข้าสู่ระบบสำเร็จ',
          data: {
            accessToken,
            refreshToken,
          },
        };
      }
      return {
        status: 401,
        message: 'เข้าสู่ระบบล้มเหลว เนื่องจากไม่พบบัญชีผู้ใช้งาน',
        error: 'Unauthorized',
      };
    } catch {
      return {
        status: 500,
        message: 'เข้าสู่ระบบล้มเหลว เนื่องจากเกิดข้อผิดพลาด',
        error: 'Internal Server Error',
      };
    }
  }

  async refreshToken(refreshToken: string): Promise<HttpResponse<AuthTokens>> {
    try {
      const payload = <JWTPayload>verifyRefreshToken(refreshToken);
      if (!payload) {
        return {
          status: 401,
          message: 'รีเฟรชโทเคนไม่ถูกต้อง',
          error: 'Unauthorized',
        };
      }
      const accessToken = generateAccessToken(payload);
      const newRefreshToken = generateRefreshToken(payload);
      return {
        status: 200,
        message: 'รีเฟรชโทเคนสำเร็จ',
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      };
    } catch {
      return {
        status: 500,
        message: 'เกิดข้อผิดพลาดในการรีเฟรชโทเคน',
        error: 'Internal Server Error',
      };
    }
  }
}
