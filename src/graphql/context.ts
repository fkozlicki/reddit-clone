import { auth } from '@/lib/auth';
import { prisma } from '../lib/prisma';
import { pubsub } from './pubsub';

export async function createContext() {
	const session = await auth();

	return { session, prisma, pubsub };
}
