import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';
import CommunityView from '@/components/views/CommunityView';

const Community = async ({
	params: { name },
}: {
	params: { name: string };
}) => {
	return (
		<>
			<FeedFilter highlighted="hot" prefix={`r/${name}`} />
			<Feed type="hot" communityName={name} />
		</>
	);
};

export default Community;
