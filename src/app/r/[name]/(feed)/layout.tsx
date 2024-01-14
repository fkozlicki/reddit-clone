import CommunityAbout from '@/components/community/CommunityAbout/CommunityAbout';
import CommunityHeader from '@/components/community/CommunityHeader/CommunityHeader';
import Grid from '@/components/ui/Grid/Grid';
import { CommunityLayoutProps } from '../layout';

export default function CommunityFeedLayout({
	children,
	params: { name },
}: CommunityLayoutProps) {
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
