import { PrismaClient } from '@/generated/prisma';
import NextAuth, { CredentialsSignin, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { isEmpty } from 'lodash';
import { AuthErrorCode } from '@/model/http.model';
import { NextResponse } from 'next/server';
import { UserRole } from '@/model/user.model';
import type { AdapterUser } from 'next-auth/adapters';
const client = new PrismaClient();
class CustomError extends CredentialsSignin {
  code: AuthErrorCode = AuthErrorCode.INVALID_CREDENTIALS;
  constructor(code: AuthErrorCode) {
    super(code);
    this.code = code;
  }
}
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Changed from number to string to match assignment
      uuid: string;
      email: string;
      role: UserRole;
      isVerified?: boolean;
    };
  }
  interface User {
    id: string; // Changed from number to string to match assignment
    uuid: string;
    email: string;
    role: UserRole;
    isVerified?: boolean;
  }
}
declare module 'next-auth/adapters' {
  interface AdapterUser {
    id: string; // Changed from number to string to match assignment
    uuid: string;
    email: string;
    role: UserRole;
    isVerified?: boolean;
  }
}
export const authOptions: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(client),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        userID: { label: 'userID', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      async authorize(credentials) {
        if (
          isEmpty(credentials) ||
          isEmpty(credentials.userID) ||
          isEmpty(credentials.password)
        ) {
          return null;
        }

        const mapUser = await client.users.findUnique({
          where: { userID: credentials.userID as string },
        });

        if (!mapUser) {
          throw new CustomError(AuthErrorCode.USER_NOT_FOUND);
        }

        if (credentials?.password) {
          // Import bcrypt dynamically to avoid Edge Runtime issues
          const bcrypt = await import('bcrypt');
          const comparePassword = await bcrypt.compare(
            credentials.password as string,
            mapUser.password,
          );
          if (comparePassword) {
            if (!mapUser.isVerified) {
              throw new CustomError(AuthErrorCode.USER_NOT_VERIFIED);
            }
            return {
              id: String(mapUser.id),
              email: mapUser.email,
              role: mapUser.role as UserRole, // Ensure role is UserRole, not null
              uuid: mapUser.uuid ?? '', // Ensure uuid is a string, not null
              isVerified: !!mapUser.isVerified, // Ensure isVerified is boolean
              name:
                mapUser?.firstName && mapUser?.lastName
                  ? `${mapUser.firstName} ${mapUser.lastName}`
                  : null, // Optional: add name if available
            };
          } else {
            throw new CustomError(AuthErrorCode.INVALID_PASSWORD);
          }
        }

        throw new CustomError(AuthErrorCode.INVALID_CREDENTIALS);
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },
    async authorized({ auth, request: { nextUrl, headers, method } }) {
      const isLogin = !!auth?.user;
      if (nextUrl.pathname.startsWith('/register')) {
        return true;
      }
      if (!isLogin) {
        return false;
      }
      if (isLogin && nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/` as string,
        );
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.uuid = user.uuid;
        token.email = user.email;
        token.role = user.role;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.uuid = token.uuid as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export const { handlers, auth, unstable_update } = handler;
