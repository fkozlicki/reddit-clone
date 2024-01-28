import { Meta, StoryObj } from '@storybook/react';
import AnimatedInput from './AnimatedInput';
import '../../../app/globals.css';

const meta: Meta<typeof AnimatedInput> = {
	title: 'ui/AnimatedInput',
	component: AnimatedInput,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedInput>;

export const Default: Story = {
	args: {
		label: 'Email',
	},
};
