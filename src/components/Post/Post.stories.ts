import { Meta, StoryObj } from '@storybook/react';
import Post from './Post';
import '../../app/globals.css';

const meta: Meta<typeof Post> = {
	title: 'Post',
	component: Post,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Post>;

export const Default: Story = {
	args: {
		id: 'asdasd',
		title: 'lorem ipsum',
		content: 'lorem ipsum',
		authorName: 'John',
		createdAt: new Date(),
		votes: [],
		comments: [],
		communityName: 'essa',
	},
};
