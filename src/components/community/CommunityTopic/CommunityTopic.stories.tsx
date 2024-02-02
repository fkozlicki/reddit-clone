import { Meta, StoryObj } from '@storybook/react';
import CommunityTopic from './CommunityTopic';
import '../../../app/globals.css';
import { TOPICS_QUERY } from '@/hooks/query/useTopics';

const meta: Meta<typeof CommunityTopic> = {
	title: 'CommunityTopic',
	component: CommunityTopic,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="w-[320px] min-h-[150px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CommunityTopic>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: TOPICS_QUERY,
					},
					result: {
						data: {
							topics: [
								{ id: '1', name: 'Sports' },
								{ id: '1', name: 'Funny' },
							],
						},
					},
				},
			],
		},
	},
};

export const WithInitialTopic: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: TOPICS_QUERY,
					},
					result: {
						data: {
							topics: [
								{ id: '1', name: 'Sports' },
								{ id: '1', name: 'Funny' },
							],
						},
					},
				},
			],
		},
	},
	args: {
		initialTopic: 'Sports',
	},
};
