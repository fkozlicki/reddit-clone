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
		children: 'Button',
	},
};

export const Filled: Story = {
	args: {
		children: 'Button',
		filled: true,
	},
};

export const Orange: Story = {
	args: {
		children: 'Button',
		color: 'orange',
	},
};

export const White: Story = {
	args: {
		children: 'Button',
		color: 'white',
	},
};
