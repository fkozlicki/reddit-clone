import FeedView from '@/components/views/FeedView';

export default async function New() {
	return <FeedView feedType="new" highlighted="new" />;
}
