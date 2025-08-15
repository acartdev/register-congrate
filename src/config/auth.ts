import { PrismaClient } from '@/generated/prisma';
import NextAuth, { CredentialsSignin, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { isEmpty } from 'lodash';
import { AuthErrorCode } from '@/model/http.model';
import { NextResponse } from 'next/server';
const client = new PrismaClient();
class CustomError extends CredentialsSignin {
  code: AuthErrorCode = AuthErrorCode.INVALID_CREDENTIALS;
  constructor(code: AuthErrorCode) {
    super(code);
    this.code = code;
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
              id: String(mapUser.uuid),
              name: mapUser.firstName + ' ' + mapUser.lastName,
              email: mapUser.email,
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
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
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
