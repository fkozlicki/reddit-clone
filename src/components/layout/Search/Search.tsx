'use client';

import Avatar from '@/components/ui/Avatar/Avatar';
import TextField from '@/components/ui/TextField/TextField';
import { useLazyCommunities } from '@/hooks/query/useCommunities';
import usePosts from '@/hooks/query/usePosts';
import { useClickAway } from '@/hooks/useClickAway';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

const Search = () => {
	const [search, setSearch] = useState<string>('');
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	const [getCommunities, { data: communities }] = useLazyCommunities();
	const ref = useClickAway<HTMLDivElement>(() => {
		setOpen(false);
	});
	const { data } = usePosts({
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
				<TextField
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
							{data &&
								search.length === 0 &&
								data.posts.edges.map(({ node }) => (
									<Link
										href={`/r/${node.community.name}/comments/${node.id}`}
										key={node.id}
										className="p-2 hover:bg-btn-text text-primary"
									>
										<div className="text-xs font-medium">
											r/{node.community.name}
										</div>
										<div>{node.title}</div>
									</Link>
								))}
							{communities && search.length > 0 && (
								<>
									{communities.communities.length > 0 ? (
										communities.communities.map((data) => (
											<Link
												href={`/r/${data.name}`}
												key={data.id}
												className="flex items-center gap-2 p-2 hover:bg-btn-text text-primary"
											>
												<Avatar size={24} />
												<div>
													<div className="text-sm font-medium">{data.name}</div>
													<div className="text-xs">Community </div>
												</div>
											</Link>
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
