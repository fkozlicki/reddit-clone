import { Meta, StoryObj } from '@storybook/react';
import CommentPreview from './CommentPreview';
import '../../../app/globals.css';

const meta: Meta<typeof CommentPreview> = {
	title: 'CommentPreview',
	component: CommentPreview,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentPreview>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};
