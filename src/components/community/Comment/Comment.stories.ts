import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import '../../../app/globals.css';
import Comment from './Comment';
import { PostComment } from '@/hooks/query/usePost';

const meta: Meta<typeof Comment> = {
	title: 'Comment',
	component: Comment,
	tags: ['autodocs'],
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		nextAuthMock: {
			session: {
				status: 'authenticated',
				data: {
					user: {
						id: '1',
						email: 'user@local',
						name: 'John Doe',
					},
				},
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Comment>;

const comment: PostComment = {
	__typename: 'Comment',
	id: '1',
	author: { id: '123', name: 'John Doe', image: null },
	content: 'Lorem ipsum dolor sit amet.',
	createdAt: new Date(),
	replies: [],
	karma: 0,
	voteValue: null,
	postId: '123',
};

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		comment,
	},
};

export const ReplyFormOpen: Story = {
	args: {
		comment,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const replyButton = canvas.getByText('Reply');
		await userEvent.click(replyButton);
		const textarea = canvas.getByPlaceholderText('What are your thoughts?');
		await userEvent.type(textarea, 'Hello world!');
	},
};

export const UpVoted: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		comment: {
			...comment,
			karma: 1,
			voteValue: 1,
		},
	},
};

export const DownVoted: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		comment: {
			...comment,
			karma: -1,
			voteValue: -1,
		},
	},
};
