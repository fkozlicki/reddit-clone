import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../../lib/prisma';
import { generateName } from '@/utils/randomNameGenerator';

export const authOptions: NextAuthOptions = {
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	adapter: PrismaAdapter(prisma),
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}

			return session;
		},
		signIn({ user }) {
			user.name = generateName();
			return true;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
