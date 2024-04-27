'use client';

import Input from '@/components/ui/Input/Input';
import { useLazyCommunities } from '@/hooks/query/useCommunities';
import usePosts from '@/hooks/query/usePosts';
import { useClickAway } from '@/hooks/useClickAway';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import CommunityResult from './CommunityResult/CommunityResult';
import PostResult from './PostResult/PostResult';
import ResultSkeleton from './ResultSkeleton/ResultSkeleton';

const Search = () => {
	const [search, setSearch] = useState<string>('');
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	const [getCommunities, { data: communities, loading: loadingCommunities }] =
		useLazyCommunities();
	const ref = useClickAway<HTMLDivElement>(() => {
		setOpen(false);
	});
	const { data, loading: loadingPosts } = usePosts({
		variables: {
			first: 3,
			sort: 'hot',
		},
	});

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (search.length === 0) {
			return;
		}

		getCommunities({
			variables: {
				take: 5,
				filter: { name: { contains: search } },
			},
		});
	}, [search]);

	const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	return (
		<div className="flex-1 max-w-[690px] hidden md:block px-4">
			<div ref={ref} className="relative">
				<Input
					value={search}
					onFocus={() => setOpen(true)}
					onChange={updateSearch}
					className="w-full rounded-3xl hover:border-post-hover focus:border-post-hover z-10 relative"
					placeholder="Search Reddit"
				/>
				{open && (
					<div className="w-full bg-primary absolute top-0 rounded-t-3xl rounded-b-md pt-[calc(38px+8px)] pb-2 shadow-md overflow-hidden">
						<div className="uppercase text-xs font-semibold px-2 mb-1 text-primary">
							Popular posts
						</div>
						<div className="flex flex-col">
							{(loadingCommunities || loadingPosts) &&
								Array.from({ length: 3 }).map((_, index) => (
									<ResultSkeleton key={index} />
								))}
							{data &&
								search.length === 0 &&
								!loadingPosts &&
								data.posts.edges.map(({ node }) => (
									<PostResult
										key={node.id}
										title={node.title}
										postId={node.id}
										communityName={node.community.name}
									/>
								))}
							{communities && search.length > 0 && !loadingCommunities && (
								<>
									{communities.communities.length > 0 ? (
										communities.communities.map((data) => (
											<CommunityResult key={data.id} name={data.name} />
										))
									) : (
										<div className="text-primary text-center px-2 py-4">
											Nothing was found
										</div>
									)}
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
