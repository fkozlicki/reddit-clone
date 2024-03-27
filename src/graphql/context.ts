import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '../lib/prisma';
import { getServerSession } from 'next-auth';
import { pubsub } from './pubsub';

export async function createContext() {
	const session = await getServerSession(authOptions);

	return { session, prisma, pubsub };
}
