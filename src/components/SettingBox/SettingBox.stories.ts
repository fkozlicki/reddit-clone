import { Meta, StoryObj } from '@storybook/react';
import SettingBox from './SettingBox';
import '../../app/globals.css';

const meta: Meta<typeof SettingBox> = {
	title: 'SettingBox',
	component: SettingBox,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SettingBox>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		name: 'name',
		label: 'Name',
		initialValue: 'John Doe',
		maxLength: 30,
	},
};

export const Textarea: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		name: 'about',
		label: 'About',
		initialValue: 'Lorem ipsum dolor sit amet.',
		maxLength: 200,
		textarea: true,
	},
};
