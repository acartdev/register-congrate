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
      subject: 'ยืนยันอีเมลของคุณ - ลงทะเบียนรับปริญญา',
      html: `
        <div style="font-family: 'Kanit', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(to bottom, #00e676 5%, #69f0ae 40%, #ffffff 100%); border-radius: 15px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <div style="text-align: center; padding: 40px 20px 20px; background: linear-gradient(to bottom, #00e676, #69f0ae);">
            <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">ระบบลงทะเบียนรับปริญญา</h1>
            <p style="color: white; font-size: 16px; margin: 10px 0 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">การยืนยันอีเมล</p>
          </div>
          
          <div style="padding: 40px 30px; background: white;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width:80px;height:80px;background:#4caf50;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
                <span style="color: white; font-size: 60px; font-weight: bold;width:100%;">✓</span>
              </div>
              <h2 style="color: #3e4850; font-size: 22px; font-weight: 700; margin: 0 0 15px;">ยืนยันอีเมลของคุณ</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">
                เรายินดีต้อนรับคุณเข้าสู่ระบบลงทะเบียนรับปริญญา<br>
                กรุณาคลิกปุ่มด้านล่างเพื่อยืนยันอีเมลของคุณ
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000/api/verify?token=${verificationToken}" 
                 style="display: inline-block; background: linear-gradient(to left, #6FD195 0%, #55C4AE 100%); color: white; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; text-shadow: 0 2px 4px rgba(0,0,0,0.3); transition: transform 0.2s;">
                ยืนยันอีเมล
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                หากคุณไม่ได้สมัครสมาชิก กรุณาเพิกเฉยต่ออีเมลนี้<br>
                หากมีปัญหา กรุณาติดต่อฝ่ายสนับสนุน
              </p>
            </div>
          </div>
        </div>
      `,
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
