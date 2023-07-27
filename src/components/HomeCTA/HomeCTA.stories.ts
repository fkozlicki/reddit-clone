import { Meta, StoryObj } from '@storybook/react';
import HomeCTA from './HomeCTA';
import '../../app/globals.css';

const meta: Meta<typeof HomeCTA> = {
	title: 'HomeCTA',
	component: HomeCTA,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomeCTA>;

export const Default: Story = {};
