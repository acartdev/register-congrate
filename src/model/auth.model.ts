export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  userId: string;
  username: string;
  exp: number; // Expiration time
  iat: number; // Issued at time
}
