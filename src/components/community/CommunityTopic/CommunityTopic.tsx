import Dropdown from '@/components/ui/Dropdown/Dropdown';
import useUpdateCommunity from '@/hooks/mutation/useUpdateCommunity';
import useTopics from '@/hooks/query/useTopics';
import { CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';

interface CommunityTopicProps {
	communityId: string;
	initialTopic?: string;
}

const CommunityTopic = ({ initialTopic, communityId }: CommunityTopicProps) => {
	const [topic, setTopic] = useState<string | undefined>(initialTopic);
	const [changeTopic, { loading: loadingSave }] = useUpdateCommunity({
		onCompleted({
			updateCommunity: {
				topic: { name },
			},
		}) {
			setTopic(name);
		},
	});
	const { data } = useTopics();

	const handleAddTopic = (topicId: string) => {
		changeTopic({
			variables: {
				id: communityId,
				topicId,
			},
		});
	};

	const items = data.topics.map((topic) => ({
		text: topic.name,
		onClick: () => handleAddTopic(topic.id),
	}));

	return (
		<>
			<div className="font-medium text-primary">Community topic</div>
			<Dropdown items={items}>
				<button>
					<div className="flex items-center gap-1 text-primary">
						<div className="text-primary">
							{loadingSave ? 'Saving...' : topic ?? 'Add topic'}
						</div>
						<CaretDown size={16} />
					</div>
				</button>
			</Dropdown>
		</>
	);
};

export default CommunityTopic;
