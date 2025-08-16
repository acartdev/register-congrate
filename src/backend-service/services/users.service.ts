import { HttpResponse } from '@/model/http.model';
import { UsersRepository } from '../repository/users.repository';
import { RegisterForm } from '@/model/form.model';
import { generatePasswordToken, verifyRefreshToken } from '@/helper/jwt.helper';
import { Department, Users } from '@/generated/prisma';
import { Permission, UserRole } from '@/model/user.model';
import { AuthRepository } from '../repository/auth.repository';
import nodemailer from 'nodemailer';
import { isEmpty } from 'lodash';

export class UsersService {
  private authRepository: AuthRepository;
  private usersRepository: UsersRepository;
  constructor() {
    this.authRepository = new AuthRepository();
    this.usersRepository = new UsersRepository();
  }
  async updateUser(user: RegisterForm): Promise<HttpResponse<string>> {
    return this.usersRepository.updateUser(user);
  }
  async verifyUser(token: string): Promise<HttpResponse<string>> {
    const data = verifyRefreshToken(token);
    const email = data!.email;
    const uuid = data!.userID;
    return this.usersRepository.verifyUser(email, uuid);
  }
  async getDepartments(): Promise<HttpResponse<Department[]>> {
    return this.usersRepository.getDepartments();
  }
  async getUsersFilter(
    searchTerm: string,
    role: UserRole,
    deptID: string | undefined,
    notUserID: number,
  ): Promise<HttpResponse<Users[]>> {
    const usersRepository = new UsersRepository();
    return usersRepository.getUsersFilter(searchTerm, role, deptID, notUserID);
  }

  async createUser(input: RegisterForm): Promise<HttpResponse<string>> {
    const userExists = await this.authRepository.checkUserExists(input);
    if (!input?.role) {
      return {
        status: 400,
        message: 'ข้อผิดพลาด: จำเป็นต้องระบุบทบาท',
        error: 'Bad Request',
      };
    }
    if (userExists) {
      return {
        status: 409,
        message: 'ผู้ใช้งานนี้มีอยู่แล้ว',
        error: 'Conflict',
      };
    }
    switch (input?.role) {
      case UserRole.STUDENT:
        input.permit = Permission.VIEW;
        break;
      case UserRole.TEACHER:
        input.permit = Permission.STAFF_TEACHER;
        break;
      default:
        input.permit = Permission.VIEW;
        break;
    }
    const res = await this.usersRepository.createUser(input);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_TRANSPORTER,
        pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
      },
    });
    const verificationToken = generatePasswordToken({
      uuid: res!.data!,
    });
    const mailOptions = {
      from: process.env.EMAIL_TRANSPORTER,
      to: input.email,
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
                  <h2 style="color: #3e4850; font-size: 22px; font-weight: 700; margin: 0 0 15px;">ยืนยันอีเมลของคุณและสร้างรหัสผ่านสำหรับเข้าสู่ระบบ</h2>
                  <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">
                    เรายินดีต้อนรับคุณเข้าสู่ระบบลงทะเบียนรับปริญญา<br>
                    กรุณาคลิกปุ่มด้านล่างเพื่อยืนยันอีเมลของคุณและสร้างรหัสผ่านสำหรับเข้าสู่ระบบ
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:3000/password?token=${verificationToken}" 
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
    return res;
  }

  async getUserByUUID(uuid: string): Promise<HttpResponse<Users>> {
    const result = await this.authRepository.getUserByUserId(uuid);
    if (!isEmpty(result)) {
      return {
        status: 200,
        message: '',
        data: result,
      };
    } else {
      return {
        status: 404,
        message: 'ไม่พบผู้ใช้งาน',
      };
    }
  }
  async deleteUser(uuid: string): Promise<HttpResponse<void>> {
    const result = await this.usersRepository.deleteUser(uuid);
    if (result) {
      return {
        status: 200,
        message: 'ลบผู้ใช้งานสำเร็จ',
      };
    } else {
      return {
        status: 404,
        message: 'ไม่พบผู้ใช้งาน',
      };
    }
  }
}
