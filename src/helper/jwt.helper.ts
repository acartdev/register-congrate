import jwt from 'jsonwebtoken';
import { DecodedToken } from '@/model/auth.model';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  '45bb6e613f740d62aabc1c11e1d5b927014b2a88a22791903b0aa220101b5640';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  'f5f04c21846554182655821646d4d83490474dd0eb1509d9811c2feeb955d69a';

export const generateAccessToken = (payload: any): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // 15 minutes
};

export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // 7 days
};

export const verifyAccessToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
};
