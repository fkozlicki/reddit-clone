import { Meta, StoryObj } from '@storybook/react';
import Editor from './RichTextEditor';
import '../../../app/globals.css';

const meta: Meta<typeof Editor> = {
	title: 'ui/Editor',
	component: Editor,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {},
};
