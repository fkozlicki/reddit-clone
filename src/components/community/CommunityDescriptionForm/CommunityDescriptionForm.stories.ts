import { Meta, StoryObj } from '@storybook/react';
import CommunityDescriptionForm from './CommunityDescriptionForm';
import '../../../app/globals.css';

const meta: Meta<typeof CommunityDescriptionForm> = {
	title: 'forms/CommunityDescriptionForm',
	component: CommunityDescriptionForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityDescriptionForm>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {},
};

export const WithDescription: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		description: 'Lorem ipsum dolor sit amet.',
	},
};
