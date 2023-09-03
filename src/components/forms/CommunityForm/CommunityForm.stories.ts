import { Meta, StoryObj } from '@storybook/react';
import CreateCommunityForm from './CommunityForm';
import '../../../app/globals.css';
import { CREATE_COMMUNITY_MUTATION } from '@/hooks/mutation/useCreateCommunity';

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
						query: CREATE_COMMUNITY_MUTATION,
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
