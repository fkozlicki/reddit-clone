import { Meta, StoryObj } from '@storybook/react';
import CreatePost from './CreatePost';
import '../../app/globals.css';

const meta: Meta<typeof CreatePost> = {
	title: 'CreatePost',
	component: CreatePost,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreatePost>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};
