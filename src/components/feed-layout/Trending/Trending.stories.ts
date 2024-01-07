import { Meta, StoryObj } from '@storybook/react';
import Trending from './Trending';
import '../../app/globals.css';

const meta: Meta<typeof Trending> = {
	title: 'Trending',
	component: Trending,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Trending>;

export const Default: Story = {};
