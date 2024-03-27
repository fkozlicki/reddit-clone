import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import Button from './Button';
import { Star } from '@phosphor-icons/react';

const meta: Meta<typeof Button> = {
	title: 'ui/Button',
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

export const Primary: Story = {
	args: {
		children: 'Button',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Button',
		variant: 'text',
	},
};

export const IconButton: Story = {
	args: {
		children: 'Button',
		variant: 'outline',
		icon: <Star size={18} />,
	},
};

export const Loading: Story = {
	args: {
		children: 'Button',
		variant: 'outline',
		loading: true,
	},
};
