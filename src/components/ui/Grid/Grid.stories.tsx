import { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';
import '../../../app/globals.css';

const meta: Meta<typeof Grid> = {
	title: 'ui/Grid',
	component: Grid,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		left: (
			<div className="bg-red-500 p-10 text-white text-center text-xl">Left</div>
		),
		right: (
			<div className="bg-blue-500 p-10 text-white text-center text-xl">
				Right
			</div>
		),
	},
};
