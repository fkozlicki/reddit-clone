import useUpdateCommunity from '@/hooks/mutation/useUpdateCommunity';
import useTopics from '@/hooks/query/useTopics';
import { useClickAway } from '@/hooks/useClickAway';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

interface CommunityTopicProps {
	initialTopic?: string;
}

const CommunityTopic = ({ initialTopic }: CommunityTopicProps) => {
	const params = useParams();
	const name = params.name as string;
	const [topicsDropdownOpen, setTopicsDropdownOpen] = useState<boolean>(false);
	const topicsDropdown = useClickAway<HTMLDivElement>(() => {
		setTopicsDropdownOpen(false);
	});
	const [topic, setTopic] = useState<string | undefined>(initialTopic);
	const [changeTopic, { loading }] = useUpdateCommunity({
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
		setTopicsDropdownOpen(false);
		changeTopic({
			variables: {
				name,
				topicId,
			},
		});
	};

	const toggleTopicsDropdown = () => {
		setTopicsDropdownOpen((prev) => !prev);
	};

	return (
		<div>
			<div className="font-medium text-primary">Community topic</div>
			<div ref={topicsDropdown} className="relative">
				<button
					onClick={toggleTopicsDropdown}
					className="flex items-center gap-2 hover:text-primary"
				>
					{loading ? (
						<div className="text-primary">Loading...</div>
					) : (
						<div className="flex items-center gap-1 text-primary">
							<div>{topic ?? 'Add topic'}</div>
							<ChevronDownIcon width={16} />
						</div>
					)}
				</button>
				{topicsDropdownOpen &&
					(data ? (
						<div className="absolute bg-primary top-full left-0 z-30 w-full shadow rounded overflow-hidden">
							{data.topics.map(({ id, name }, index) => (
								<div
									onClick={() => handleAddTopic(id)}
									key={index}
									className="p-2 hover:bg-primary-hover text-primary text-sm font-medium cursor-pointer"
								>
									{name}
								</div>
							))}
						</div>
					) : (
						<div>Couldn&apos;t load topics</div>
					))}
			</div>
		</div>
	);
};

export default CommunityTopic;
