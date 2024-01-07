import { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';
import '../../app/globals.css';
import { userEvent, within } from '@storybook/testing-library';
import { COMMENT_VOTE_MUTATION } from '@/hooks/mutation/useVote';

const meta: Meta<typeof Comment> = {
	title: 'Comment',
	component: Comment,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		id: '1',
		authorName: 'John Doe',
		content: 'Lorem ipsum dolor sit amet.',
		createdAt: new Date(),
		votes: [],
	},
};

export const ReplyFormOpen: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	args: {
		id: '1',
		authorName: 'John Doe',
		content: 'Lorem ipsum dolor sit amet.',
		createdAt: new Date(),
		votes: [],
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
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMENT_VOTE_MUTATION,
						variables: {
							value: 1,
							commentId: '1',
						},
					},
					result: {
						data: {
							makeCommentVote: {
								id: '1',
								value: 1,
								userId: '123',
								commentId: '1',
							},
						},
					},
				},
			],
		},
	},
	args: {
		id: '1',
		authorName: 'John Doe',
		content: 'Lorem ipsum dolor sit amet.',
		createdAt: new Date(),
		votes: [],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const upVoteButton = canvas.getByLabelText('Up Vote');
		await userEvent.click(upVoteButton);
	},
};

export const DownVoted: Story = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: COMMENT_VOTE_MUTATION,
						variables: {
							value: -1,
							commentId: '1',
						},
					},
					result: {
						data: {
							makeCommentVote: {
								id: '1',
								value: -1,
								userId: '123',
								commentId: '1',
							},
						},
					},
				},
			],
		},
	},
	args: {
		id: '1',
		authorName: 'John Doe',
		content: 'Lorem ipsum dolor sit amet.',
		createdAt: new Date(),
		votes: [],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const downVoteButton = canvas.getByLabelText('Down Vote');
		await userEvent.click(downVoteButton);
	},
};
