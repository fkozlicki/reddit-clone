import { Meta, StoryObj } from '@storybook/react';
import PostSkeleton from './PostSkeleton';
import '../../../app/globals.css';

const meta: Meta<typeof PostSkeleton> = {
	title: 'PostSkeleton',
	component: PostSkeleton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostSkeleton>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		name: 'MyFirstCommunity',
	},
};
