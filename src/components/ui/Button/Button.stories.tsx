import { StarIcon } from '@heroicons/react/24/outline';
import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import Button from './Button';

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
		variant: 'secondary',
	},
};

export const IconButton: Story = {
	args: {
		children: 'Button',
		variant: 'secondary',
		icon: <StarIcon width="1em" height="1em" />,
	},
};
