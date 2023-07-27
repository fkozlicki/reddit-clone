import { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';
import '../../app/globals.css';

const meta: Meta<typeof Comment> = {
	title: 'Comment',
	component: Comment,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
	args: {
		id: '123',
		authorName: 'John Doe',
		content: 'Lorem ipsum dolor amet si',
		createdAt: new Date(),
		votes: [],
	},
};
