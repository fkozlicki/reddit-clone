import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NodemailerProvider from 'next-auth/providers/nodemailer';
import { prisma } from './prisma';
import { generateName } from '@/utils/randomNameGenerator';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		NodemailerProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
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
});
