import { Meta, StoryObj } from '@storybook/react';
import CommunityHeader from './CommunityHeader';
import '../../../app/globals.css';

const meta: Meta<typeof CommunityHeader> = {
	title: 'CommunityHeader',
	component: CommunityHeader,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityHeader>;

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
