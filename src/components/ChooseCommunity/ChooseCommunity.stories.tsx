import { Meta, StoryObj } from '@storybook/react';
import ChooseCommunity from './ChooseCommunity';
import '../../app/globals.css';
import { USER_COMMUNITIES_QUERY } from '@/hooks/query/useUserCommunities';

const meta: Meta<typeof ChooseCommunity> = {
	title: 'ChooseCommunity',
	component: ChooseCommunity,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="min-h-[200px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ChooseCommunity>;

export const Default: Story = {
	args: {},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					delay: 600,
					request: {
						query: USER_COMMUNITIES_QUERY,
					},
					result: {
						data: {
							user: {
								communities: [
									{
										id: crypto.randomUUID(),
										name: 'MyFirstCommunity',
										members: [
											{
												id: crypto.randomUUID(),
											},
										],
									},
								],
							},
						},
					},
				},
			],
		},
	},
};

export const Selected: Story = {
	args: {
		community: {
			id: crypto.randomUUID(),
			name: 'MyFirstCommunity',
			createdAt: new Date(),
			description: null,
			topicId: null,
		},
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					delay: 600,
					request: {
						query: USER_COMMUNITIES_QUERY,
					},
					result: {
						data: {
							user: {
								communities: [
									{
										id: crypto.randomUUID(),
										name: 'MyFirstCommunity',
										members: [
											{
												id: crypto.randomUUID(),
											},
										],
									},
								],
							},
						},
					},
				},
			],
		},
	},
};
