import { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';
import '../../app/globals.css';

const meta: Meta<typeof Spinner> = {
	title: 'Spinner',
	component: Spinner,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
