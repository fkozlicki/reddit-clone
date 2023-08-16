import { Meta, StoryObj } from '@storybook/react';
import CommunityMembershipButton, {
	COMMUNITY_QUERY,
} from './CommunityMembershipButton';
import '../../app/globals.css';

const meta: Meta<typeof CommunityMembershipButton> = {
	title: 'CommunityMembershipButton',
	component: CommunityMembershipButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityMembershipButton>;

export const Default: Story = {
	parameters: {
		nextAuthMock: {
			session: {
				data: {
					user: {
						id: '1234',
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
						variables: { name: 'MyFirstCommunity' },
					},
					result: {
						data: {
							community: {
								members: [
									{
										id: '123',
										email: 'user@local',
										name: 'John Doe',
									},
								],
							},
						},
					},
				},
			],
		},
	},
	args: {
		name: 'MyFirstCommunity',
		classNames: 'w-24',
	},
};

export const Joined: Story = {
	parameters: {
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
						variables: { name: 'MyFirstCommunity' },
					},
					result: {
						data: {
							community: {
								members: [
									{
										id: '123',
										email: 'user@local',
										name: 'John Doe',
									},
								],
							},
						},
					},
				},
			],
		},
	},
	args: {
		name: 'MyFirstCommunity',
		classNames: 'w-24',
	},
};
