import { Meta, StoryObj } from '@storybook/react';
import CommunityAbout from './CommunityAbout';
import '../../../app/globals.css';
import { COMMUNITY_QUERY } from '@/hooks/query/useCommunity';
import { TOPICS_QUERY } from '@/hooks/query/useTopics';

const meta: Meta<typeof CommunityAbout> = {
	title: 'CommunityAbout',
	component: CommunityAbout,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="max-w-[312px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CommunityAbout>;

export const Default: Story = {
	args: {
		withName: true,
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMUNITY_QUERY,
					},
					result: {
						data: {
							community: {
								name: 'MyFirstCommunity',
								description: 'Lorem ipsum dolor amet si',
								createdAt: new Date().toISOString(),
								members: [],
								moderators: [],
								topic: {
									id: 'essa123',
								},
							},
						},
					},
				},
			],
		},
	},
};

export const WithHeader: Story = {
	args: {
		withName: true,
		withHeader: true,
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMUNITY_QUERY,
					},
					result: {
						data: {
							community: {
								name: 'MyFirstCommunity',
								description: 'Lorem ipsum dolor amet si',
								createdAt: new Date().toISOString(),
								members: [],
								moderators: [],
								topic: {
									id: 'essa123',
								},
							},
						},
					},
				},
			],
		},
	},
};

export const CtaJoin: Story = {
	args: {
		withName: true,
		cta: 'Join',
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMUNITY_QUERY,
					},
					result: {
						data: {
							community: {
								name: 'MyFirstCommunity',
								description: 'Lorem ipsum dolor amet si',
								createdAt: new Date().toISOString(),
								members: [],
								moderators: [],
								topic: {
									id: 'essa123',
								},
							},
						},
					},
				},
			],
		},
	},
};

export const CtaCreatePost: Story = {
	args: {
		withHeader: true,
		cta: 'Create Post',
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMUNITY_QUERY,
					},
					result: {
						data: {
							community: {
								name: 'MyFirstCommunity',
								description: 'Lorem ipsum dolor amet si',
								createdAt: new Date().toISOString(),
								members: [],
								moderators: [],
								topic: {
									id: 'essa123',
								},
							},
						},
					},
				},
			],
		},
	},
};

export const Editable: Story = {
	args: {
		withName: true,
		editable: true,
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		nextAuthMock: {
			session: {
				data: {
					user: {
						id: '123',
						email: 'user@local',
						name: 'John Doe',
					},
				},
				status: 'authenticated',
			},
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMUNITY_QUERY,
					},
					result: {
						data: {
							community: {
								name: 'MyFirstCommunity',
								description: 'Lorem ipsum dolor amet si',
								createdAt: new Date().toISOString(),
								members: [],
								moderators: [
									{
										id: '123',
									},
								],
								topic: {
									id: 'essa123',
								},
							},
						},
					},
				},
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
