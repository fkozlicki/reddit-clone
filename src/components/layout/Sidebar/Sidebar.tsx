'use client';

import React from 'react';
import Button from '../../buttons/Button/Button';
import Link from 'next/link';
import LinkButton from '../../buttons/LinkButton/LinkButton';
import { StarIcon } from '@heroicons/react/24/solid';
import { useModalsContext } from '@/contexts/ModalsContext';
import { gql, useQuery } from '@apollo/client';
import { Topic } from '@prisma/client';

const TOPICS_QUERY = gql`
	query {
		topics {
			name
		}
	}
`;

const Sidebar = () => {
	const [, dispatch] = useModalsContext();
	const { data } = useQuery<{ topics: Topic[] }>(TOPICS_QUERY);

	const openSignIn = () => {
		dispatch({ type: 'openSignIn' });
	};

	return (
		<div className="flex w-[270px] h-[calc(100vh-48px)] xl:flex flex-col bg-background-primary">
			<div className="flex-1">
				<div className="text-[10px] uppercase px-5 pb-1 pt-3">feeds</div>
				<Link
					href="/"
					className="block text-sm px-5 py-2 hover:bg-button-hover"
				>
					Popular
				</Link>
				<div className="text-[10px] uppercase px-5 pb-1 pt-3">topics</div>
				{data?.topics.map(({ name }, index) => (
					<LinkButton
						key={index}
						href={`/t/${name}`}
						icon={<StarIcon width={20} />}
						text={name}
					/>
				))}
			</div>
			<div className="w-full h-px px-6">
				<div className=" bg-border-input w-full h-full" />
			</div>
			<div className="p-6">
				<p className="text-sm leading-[18px] pr-6 pb-5">
					Create an account to follow your favorite communities and start taking
					part in conversations.
				</p>
				<Button
					text="Join Reddit"
					color="orange"
					filled
					height="h-[40px]"
					onClick={openSignIn}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
