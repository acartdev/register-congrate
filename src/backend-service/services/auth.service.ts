import 'server-only';
import { AuthRepository } from '../repository/auth.repository';
import { PasswordForm, RegisterForm } from '@/model/form.model';
import { HttpResponse } from '@/model/http.model';
import bcrypt from 'bcrypt';
import { Users } from '@/generated/prisma';
import nodemailer from 'nodemailer';
import { Jwt } from 'jsonwebtoken';
import { generateRefreshToken } from '@/helper/jwt.helper';
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
    const res = await this.authRepository.register(userData);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_TRANSPORTER,
        pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
      },
    });
    const verificationToken = generateRefreshToken({
      email: res!.email,
      userID: res!.uuid!,
    });
    const mailOptions = {
      from: process.env.EMAIL_TRANSPORTER,
      to: userData.email,
      subject: 'ยืนยันอีเมลของคุณ',
      html: `<p>กรุณาคลิกลิงก์นี้เพื่อยืนยันอีเมล: <a href="http://localhost:3000/api/verify?token=${verificationToken}">ยืนยันอีเมล</a></p>`,
    };
    await transporter.sendMail(mailOptions);
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
