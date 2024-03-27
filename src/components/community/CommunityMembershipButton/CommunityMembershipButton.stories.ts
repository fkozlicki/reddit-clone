import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import CommunityMembershipButton from './CommunityMembershipButton';

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
	},
	args: {
		community: {
			id: '123',
			image: null,
			joined: false,
			membersCount: 12,
			name: 'MyFirstCommunity',
		},
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
	},
	args: {
		community: {
			id: '123',
			image: null,
			joined: false,
			membersCount: 12,
			name: 'MyFirstCommunity',
		},
	},
};
