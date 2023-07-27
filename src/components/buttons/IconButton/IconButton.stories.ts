import { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import '../../../app/globals.css';

const meta: Meta<typeof IconButton> = {
	title: 'Buttons/IconButton',
	component: IconButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
	args: {
		text: 'IconButton',
	},
};
