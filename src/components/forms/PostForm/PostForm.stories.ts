import { Meta, StoryObj } from '@storybook/react';
import CreatePostForm from './PostForm';
import '../../../app/globals.css';

const meta: Meta<typeof CreatePostForm> = {
	title: 'Forms/CreatePostForm',
	component: CreatePostForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreatePostForm>;

export const Default: Story = {
	args: {
		communityId: 'asd',
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};
