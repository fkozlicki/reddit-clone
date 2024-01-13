import { Meta, StoryObj } from '@storybook/react';
import Post from './Post';
import '../../../app/globals.css';

const meta: Meta<typeof Post> = {
	title: 'Post',
	component: Post,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Post>;

export const Default: Story = {
	args: {
		post: {
			id: 'asdasd',
			title: 'lorem ipsum',
			content: 'lorem ipsum',
			author: { name: 'John' },
			createdAt: new Date(),
			votes: [],
			community: { name: 'essa' },
			comments: [],
		},
	},
};