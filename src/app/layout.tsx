import Providers from '@/components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import HomeSidebar from '@/components/HomeSidebar/HomeSidebar';
import { ReactNode } from 'react';
import ChangeNameForm from '@/components/ChangeNameForm/ChangeNameForm';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
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
					{session && !session.user.name && <ChangeNameForm />}
					<Toaster position="top-center" />
					<Navbar />
					<main className="flex">
						{!session && (
							<div className="hidden xl:block">
								<HomeSidebar />
							</div>
						)}
						{children}
					</main>
				</body>
			</Providers>
		</html>
	);
}
