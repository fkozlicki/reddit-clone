import { FeedType } from '@/hooks/query/usePosts';

import FeedFilter, {
	FeedFilterProps,
} from '../feed-layout/FeedFilter/FeedFilter';
import Grid from '../ui/Grid/Grid';
import CommunityHeader from '../community/CommunityHeader/CommunityHeader';
import CommunityAbout from '../community/CommunityAbout/CommunityAbout';
import Feed from '../feed-layout/Feed/Feed';

interface CommunityViewProps {
	name: string;
	feedType: FeedType;
	highlighted: FeedFilterProps['highlighted'];
}

const CommunityView = ({ name, feedType, highlighted }: CommunityViewProps) => {
	return (
		<>
			<CommunityHeader name={name} />
			<div className="py-6 px-4">
				<Grid
					left={
						<>
							<FeedFilter highlighted={highlighted} prefix={`r/${name}`} />
							<Feed type={feedType} communityName={name} />
						</>
					}
					right={
						<>
							<CommunityAbout withHeader editable cta="Create Post" />
						</>
					}
				/>
			</div>
		</>
	);
};

export default CommunityView;
