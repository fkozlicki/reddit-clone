import { Meta, StoryObj } from '@storybook/react';
import ChooseCommunity, { UserQuery } from './ChooseCommunity';
import '../../app/globals.css';

const meta: Meta<typeof ChooseCommunity> = {
	title: 'ChooseCommunity',
	component: ChooseCommunity,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChooseCommunity>;

export const Default: Story = {
	args: {
		community: {
			id: '1234asd',
			createdAt: new Date(),
			description: 'Lorem ipsum dolor amet si',
			name: 'New Community',
			topicId: '123sadad',
		},
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: UserQuery,
					},
				},
			],
		},
	},
};
