import React from 'react';
import Grid from '../Grid/Grid';
import CommunityHeader from '../CommunityHeader/CommunityHeader';
import FeedFilter, { FeedFilterProps } from '../FeedFilter/FeedFilter';
import { DocumentNode } from 'graphql';
import Feed from '../Feed/Feed';
import CommunityAbout from '../CommunityAbout/CommunityAbout';

interface CommunityScreenProps {
	query: DocumentNode;
	name: string;
	highlighted: FeedFilterProps['highlighted'];
}

const CommunityScreen = ({
	name,
	query,
	highlighted,
}: CommunityScreenProps) => {
	return (
		<div className="flex-1 min-h-[calc(100vh-48px)] bg-background-feed">
			<CommunityHeader />
			<Grid
				left={
					<>
						<FeedFilter highlighted={highlighted} prefix={`r/${name}`} />
						<Feed query={query} />
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
