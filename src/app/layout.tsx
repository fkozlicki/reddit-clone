import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar/Navbar';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { authOptions } from './api/auth/[...nextauth]/route';
import './globals.css';
import dynamic from 'next/dynamic';
import ChatRoom from '@/components/shared/ChatRoom/ChatRoom';
const Sidebar = dynamic(() => import('@/components/layout/Sidebar/Sidebar'));

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Reddit - Beyond the Feed',
	description:
		'Elevate your online experience with Reddit, the hub for diverse communities and vibrant discussions. Immerse yourself in a dynamic platform that goes beyond the ordinary, connecting you with a global network of voices.',
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<Toaster position="top-center" />
					<Navbar session={session} />
					<ChatRoom />
					<main
						className={cn('pt-12 min-h-screen bg-secondary', {
							'xl:pl-[270px] flex': !session,
						})}
					>
						{!session && <Sidebar />}
						<div className="flex-1">{children}</div>
					</main>
					<div id="portal" />
				</Providers>
			</body>
		</html>
	);
}
