import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import '../../../app/globals.css';

const meta: Meta<typeof Button> = {
	title: 'Buttons/Button',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		text: 'Button',
	},
};

export const Filled: Story = {
	args: {
		text: 'Button',
		filled: true,
	},
};

export const Orange: Story = {
	args: {
		text: 'Button',
		color: 'orange',
	},
};

export const White: Story = {
	args: {
		text: 'Button',
		color: 'white',
	},
};

export const FixedWidth: Story = {
	args: {
		text: 'Button',
		color: 'orange',
		filled: true,
		width: 'w-[120px]',
	},
};
