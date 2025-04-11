'use client';

import Button from '@/components/ui/Button/Button';
import { useModalsContext } from '@/contexts/ModalsContext';
import Link from 'next/link';
import { Suspense } from 'react';
import TopicsList from '../TopicsList/TopicsList';

const Sidebar = () => {
	const [, dispatch] = useModalsContext();

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div className="hidden xl:block fixed top-12 left-0">
			<div className="flex w-[270px] h-[calc(100vh-48px)] xl:flex flex-col bg-primary">
				<div className="flex-1">
					<div className="text-[10px] uppercase px-5 pb-1 pt-3 text-primary">
						feeds
					</div>
					<Link
						href="/"
						className="block text-sm px-5 py-2 hover:bg-btn-text text-primary"
					>
						Popular
					</Link>
					<Suspense fallback="Loading...">
						<TopicsList />
					</Suspense>
				</div>
				<div className="w-full h-px px-6">
					<div className=" bg-border-input w-full h-full" />
				</div>
				<div className="p-6">
					<p className="text-sm leading-[18px] pr-6 pb-5 text-primary">
						Create an account to follow your favorite communities and start
						taking part in conversations.
					</p>
					<Button
						onClick={openSignIn}
						className="w-full"
						variant="primary"
						size="large"
					>
						Join Reddit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
