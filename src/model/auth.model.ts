export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  userID: string;
  role: string;
  email: string;
  exp: number; // Expiration time
  iat: number; // Issued at time
}

export interface AuthUser {
  userID: string;
  role: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
