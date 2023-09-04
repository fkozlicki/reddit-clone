'use client';

import React from 'react';
import Button from '../../buttons/Button/Button';
import Link from 'next/link';
import LinkButton from '../../buttons/LinkButton/LinkButton';
import { StarIcon } from '@heroicons/react/24/solid';
import { useModalsContext } from '@/contexts/ModalsContext';
import useTopics from '@/hooks/query/useTopics';

const Sidebar = () => {
	const [, dispatch] = useModalsContext();
	const { data } = useTopics();

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div className="flex w-[270px] h-[calc(100vh-48px)] xl:flex flex-col bg-primary">
			<div className="flex-1">
				<div className="text-[10px] uppercase px-5 pb-1 pt-3 text-primary">
					feeds
				</div>
				<Link
					href="/"
					className="block text-sm px-5 py-2 hover:bg-primary-hover text-primary"
				>
					Popular
				</Link>
				<div className="text-[10px] uppercase px-5 pb-1 pt-3 text-primary">
					topics
				</div>
				{data?.topics.map(({ name }, index) => (
					<LinkButton
						key={index}
						href={`/t/${name}`}
						icon={<StarIcon width={20} className="text-primary" />}
						text={name}
					/>
				))}
			</div>
			<div className="w-full h-px px-6">
				<div className=" bg-border-input w-full h-full" />
			</div>
			<div className="p-6">
				<p className="text-sm leading-[18px] pr-6 pb-5 text-primary">
					Create an account to follow your favorite communities and start taking
					part in conversations.
				</p>
				<Button
					onClick={openSignIn}
					color="orange"
					filled
					classNames="h-[40px] w-full"
				>
					Join Reddit
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
