import CommunityAbout from '@/components/community/CommunityAbout/CommunityAbout';
import CommunityHeader from '@/components/community/CommunityHeader/CommunityHeader';
import Grid from '@/components/ui/Grid/Grid';
import { CommunityLayoutProps } from '../layout';

export default async function CommunityFeedLayout({
	children,
	params,
}: CommunityLayoutProps) {
	const { name } = await params;

	return (
		<>
			<CommunityHeader name={name} />
			<div className="py-6 px-4">
				<Grid
					left={children}
					right={<CommunityAbout withHeader editable cta="Create Post" />}
				/>
			</div>
		</>
	);
}
