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
		<html lang="en">
			<Providers>
				<body className={inter.className}>
					<Toaster position="top-center" />
					<div className="fixed w-full top-0 z-20">
						<Navbar session={session} />
					</div>
					<main
						className={cn('pt-12 min-h-screen bg-secondary', {
							'xl:pl-[270px] flex': !session,
						})}
					>
						{!session && (
							<div className="hidden xl:block fixed top-12 left-0">
								<Sidebar />
							</div>
						)}
						<div className="flex-1">{children}</div>
					</main>
					<div id="portal" />
				</body>
			</Providers>
		</html>
	);
}
