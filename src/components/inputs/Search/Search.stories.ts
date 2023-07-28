import { Meta, StoryObj } from '@storybook/react';
import Search from './Search';
import '../../app/globals.css';

const meta: Meta<typeof Search> = {
	title: 'Search',
	component: Search,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};
