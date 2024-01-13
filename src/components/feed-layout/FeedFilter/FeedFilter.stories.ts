import { Meta, StoryObj } from '@storybook/react';
import FeedFilter from './FeedFilter';
import '../../../app/globals.css';

const meta: Meta<typeof FeedFilter> = {
	title: 'FeedFilter',
	component: FeedFilter,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeedFilter>;

export const Default: Story = {
	args: {},
};
