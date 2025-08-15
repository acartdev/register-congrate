export interface HttpResponse<T> {
  status: number;
  data?: T;
  message?: string;
  error?: string;
}

export enum AuthErrorCode {
  USER_NOT_FOUND = 'ไม่พบบัญชีผู้ใช้',
  INVALID_CREDENTIALS = 'ข้อมูลประจำตัวไม่ถูกต้อง',
  INVALID_PASSWORD = 'รหัสผ่านไม่ถูกต้อง',
  USER_NOT_VERIFIED = 'บัญชีผู้ใช้ยังไม่ได้รับการยืนยัน',
}
