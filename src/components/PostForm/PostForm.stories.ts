import { Meta, StoryObj } from '@storybook/react';
import PostForm from './PostForm';
import '../../app/globals.css';

const meta: Meta<typeof PostForm> = {
	title: 'Forms/PostForm',
	component: PostForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostForm>;

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
