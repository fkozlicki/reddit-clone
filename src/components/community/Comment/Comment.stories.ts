import { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';
import '../../../app/globals.css';
import { userEvent, within } from '@storybook/testing-library';
import { COMMENT_VOTE_MUTATION } from '@/hooks/mutation/useVote';

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

const comment = {
	id: '1',
	author: { name: 'John Doe', image: null },
	content: 'Lorem ipsum dolor sit amet.',
	createdAt: new Date(),
	votes: [],
	replies: [],
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
			votes: [{ userId: '1', value: 1 }],
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
			votes: [{ userId: '1', value: -1 }],
		},
	},
};
