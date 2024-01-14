import Feed from '@/components/feed-layout/Feed/Feed';
import FeedFilter from '@/components/feed-layout/FeedFilter/FeedFilter';
import CommunityView from '@/components/views/CommunityView';

const page = ({ params: { name } }: { params: { name: string } }) => {
	return (
		<>
			<FeedFilter highlighted="top" prefix={`r/${name}`} />
			<Feed type="top" communityName={name} />
		</>
	);
};

export default page;
