import { useClickAway } from '@/hooks/useClickAway';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Community, Topic } from '@prisma/client';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

type AddTopicValues = {
	name: string;
	topicId: string;
};
type AddTopicRespnse = {
	updateCommunity: Community & {
		topic: Topic;
	};
};
type TopicsQueryResponse = {
	topics: Topic[];
};

const TopicsQuery = gql`
	query {
		topics {
			id
			name
		}
	}
`;

const AddTopicMutation = gql`
	mutation ($name: String!, $topicId: String!) {
		updateCommunity(name: $name, topicId: $topicId) {
			name
			topic {
				name
			}
		}
	}
`;

const TopicsDropdown = ({ addTopic }: { addTopic: (id: string) => void }) => {
	const { data, loading, error } = useQuery<TopicsQueryResponse>(TopicsQuery);

	if (loading) {
		return <div>Loading topics...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	if (data && data.topics.length < 1) {
		return <div>No topics</div>;
	}

	return (
		<div className="absolute bg-background-primary top-full left-0 z-30 w-full shadow rounded overflow-hidden">
			{data?.topics.map(({ id, name }, index) => (
				<div
					onClick={() => addTopic(id)}
					key={index}
					className="p-2 hover:bg-primary hover:text-white text-sm font-medium cursor-pointer"
				>
					{name}
				</div>
			))}
		</div>
	);
};

interface CommunityTopicProps {
	initialTopic: string;
}

const CommunityTopic = ({ initialTopic }: CommunityTopicProps) => {
	const params = useParams();
	const name = params.name as string;
	const [topicsDropdownOpen, setTopicsDropdownOpen] = useState<boolean>(false);
	const topicsDropdown = useClickAway<HTMLDivElement>(() => {
		setTopicsDropdownOpen(false);
	});
	const [topic, setTopic] = useState(initialTopic);
	const [changeTopic, { loading }] = useMutation<
		AddTopicRespnse,
		AddTopicValues
	>(AddTopicMutation, {
		onCompleted(data) {
			setTopic(data.updateCommunity.topic.name);
		},
	});

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
			<div className="font-medium">Community topic</div>
			<div ref={topicsDropdown} className="relative">
				<button
					onClick={toggleTopicsDropdown}
					className="flex items-center gap-2 hover:text-primary"
				>
					{loading ? (
						<div>Loading...</div>
					) : (
						<div className="flex items-center gap-1">
							<div>{topic ?? 'Add topic'}</div>
							<ChevronDownIcon width={16} />
						</div>
					)}
				</button>
				{topicsDropdownOpen && <TopicsDropdown addTopic={handleAddTopic} />}
			</div>
		</div>
	);
};

export default CommunityTopic;
