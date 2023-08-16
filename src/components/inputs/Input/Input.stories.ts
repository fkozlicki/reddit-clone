import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import '../../../app/globals.css';

const meta: Meta<typeof Input> = {
	title: 'inputs/Input',
	component: Input,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		placeholder: 'Name',
	},
};
