'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth as useAuthHook } from '@/hook/auth.hook';
import { AuthUser } from '@/model/auth.model';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider
      value={{
        user: auth.user || null,
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        refetch: auth.refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};