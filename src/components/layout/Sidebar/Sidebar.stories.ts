import { Meta, StoryObj } from '@storybook/react';
import HomeSidebar from './Sidebar';
import '../../../app/globals.css';

const meta: Meta<typeof HomeSidebar> = {
	title: 'HomeSidebar',
	component: HomeSidebar,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomeSidebar>;

export const Default: Story = {};
