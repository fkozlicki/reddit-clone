'use client';

import React from 'react';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import { useModalsContext } from '@/contexts/ModalsContext';
import useTopics from '@/hooks/query/useTopics';
import { Star } from '@phosphor-icons/react';

const Sidebar = () => {
	const [, dispatch] = useModalsContext();
	const { data } = useTopics();

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
					<div className="text-[10px] uppercase px-5 pb-1 pt-3 text-primary">
						topics
					</div>
					<div className="max-h-[336px] overflow-auto mobile-scrollbar mobile-scrollbar-vertical">
						{data?.topics.map(({ slug, name }, index) => (
							<Link key={index} href={`/t/${slug}`}>
								<Button
									className="w-full rounded-none justify-start"
									variant="text"
									icon={<Star weight="fill" size={20} />}
								>
									{name}
								</Button>
							</Link>
						))}
						{data?.topics.map(({ slug, name }, index) => (
							<Link key={index} href={`/t/${slug}`}>
								<Button
									className="w-full rounded-none justify-start"
									variant="text"
									icon={<Star weight="fill" size={20} />}
								>
									{name}
								</Button>
							</Link>
						))}
					</div>
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
