import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
	title: 'ui/Textarea',
	component: Textarea,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {},
};
