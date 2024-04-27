import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import Input from './Input';

const meta: Meta<typeof Input> = {
	title: 'ui/Input',
	component: Input,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {},
};
