import CommunityAbout from '@/components/community/CommunityAbout/CommunityAbout';
import CommunityHeader from '@/components/community/CommunityHeader/CommunityHeader';
import Grid from '@/components/ui/Grid/Grid';
import { TOPICS_QUERY } from '@/hooks/query/useTopics';
import { PreloadQuery } from '@/lib/apollo';
import { CommunityLayoutProps } from '../layout';

export default async function CommunityFeedLayout({
	children,
	params,
}: CommunityLayoutProps) {
	const { name } = await params;

	return (
		<PreloadQuery query={TOPICS_QUERY}>
			<CommunityHeader name={name} />
			<div className="py-6 px-4">
				<Grid
					left={children}
					right={<CommunityAbout withHeader editable cta="Create Post" />}
				/>
			</div>
		</PreloadQuery>
	);
}
