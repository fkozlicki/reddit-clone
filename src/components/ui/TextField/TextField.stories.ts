import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import TextField from './TextField';

const meta: Meta<typeof TextField> = {
	title: 'ui/TextField',
	component: TextField,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	args: {},
};
