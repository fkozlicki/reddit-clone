import { Meta, StoryObj } from '@storybook/react';
import CreateCommunityForm, { CreateCommunityMutation } from './CommunityForm';
import '../../../app/globals.css';

const meta: Meta<typeof CreateCommunityForm> = {
	title: 'Forms/CreateCommunityForm',
	component: CreateCommunityForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateCommunityForm>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: CreateCommunityMutation,
					},
					result: {
						data: {
							viewer: null,
						},
					},
				},
			],
		},
	},
};
