import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';
import { POSTS_QUERY } from '@/hooks/query/usePosts';
import { PreloadQuery } from '@/lib/apollo';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<PreloadQuery
			query={POSTS_QUERY}
			variables={{
				first: 5,
				sort: 'hot',
			}}
		>
			<Suspense fallback="Loading">
				<FeedFilter best highlighted="best" />
				<Feed sort="hot" />
			</Suspense>
		</PreloadQuery>
	);
}
