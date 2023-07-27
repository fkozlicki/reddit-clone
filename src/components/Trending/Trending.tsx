import React from 'react';

interface PostProps {
	title: string;
	description: string;
}

const Post = ({ title, description }: PostProps) => {
	return (
		<div className="h-44 bg-background-primary flex-1 rounded-lg min-w-[208px] max-w-[375px]">
			<div className="p-3 mt-20">
				<div className="font-bold text-lg">{title}</div>
				<div className="text-sm">{description}</div>
			</div>
		</div>
	);
};

const Trending = () => {
	return (
		<div>
			<div className="mb-4 max-w-[1020px] m-auto pt-4 px-10 sm:px-6">
				<div>
					<div className="text-sm font-medium mb-2">Trending today</div>
					<div className="flex gap-3 overflow-hidden flex-wrap h-44">
						{posts.map((post, index) => (
							<Post key={index} {...post} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Trending;

const posts = [
	{ title: 'Robert de Niro', description: 'lorem ipsum' },
	{ title: 'Robert de Niro', description: 'lorem ipsum' },
	{ title: 'Robert de Niro', description: 'lorem ipsum' },
	{ title: 'Robert de Niro', description: 'lorem ipsum' },
];
