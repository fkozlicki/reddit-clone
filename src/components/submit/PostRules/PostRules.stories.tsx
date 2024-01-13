import { Meta, StoryObj } from '@storybook/react';
import PostRules from './PostRules';
import '../../../app/globals.css';

const meta: Meta<typeof PostRules> = {
	title: 'PostRules',
	component: PostRules,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="w-[320px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof PostRules>;

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
