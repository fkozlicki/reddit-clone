import React from 'react';
import Grid from '../Grid/Grid';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import FeedFilter, { FeedFilterProps } from '../FeedFilter/FeedFilter';
import Feed from '../Feed/Feed';
import CommunityAbout from '../CommunityAbout/CommunityAbout';
import { FeedType } from '@/hooks/query/usePosts';

interface CommunityScreenProps {
	name: string;
	feedType: FeedType;
	highlighted: FeedFilterProps['highlighted'];
}

const CommunityScreen = ({
	name,
	feedType,
	highlighted,
}: CommunityScreenProps) => {
	return (
		<div className="flex-1 min-h-[calc(100vh-48px)] bg-background-feed">
			<CommunityHeader name={name} />
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
	);
};

export default CommunityScreen;
