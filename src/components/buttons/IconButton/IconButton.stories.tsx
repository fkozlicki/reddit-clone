import { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import '../../../app/globals.css';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const meta: Meta<typeof IconButton> = {
	title: 'Buttons/IconButton',
	component: IconButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
	args: {
		icon: <AcademicCapIcon width={24} />,
	},
};

export const WithText: Story = {
	args: {
		icon: <AcademicCapIcon width={24} />,
		text: 'Button',
	},
};

export const Circle: Story = {
	args: {
		shape: 'circle',
		icon: <AcademicCapIcon width={24} />,
	},
};

export const CircleWithText: Story = {
	args: {
		shape: 'circle',
		icon: <AcademicCapIcon width={24} />,
		text: 'Button',
	},
};
