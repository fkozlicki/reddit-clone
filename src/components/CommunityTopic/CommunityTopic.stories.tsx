import { Meta, StoryObj } from '@storybook/react';
import CommunityTopic, { TopicsQuery } from './CommunityTopic';
import '../../app/globals.css';

const meta: Meta<typeof CommunityTopic> = {
	title: 'CommunityTopic',
	component: CommunityTopic,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="w-[320px]">
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
						query: TopicsQuery,
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
						query: TopicsQuery,
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
