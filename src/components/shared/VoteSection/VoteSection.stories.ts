import { Meta, StoryObj } from '@storybook/react';
import VoteSection from './VoteSection';
import '../../../app/globals.css';
import { userEvent, within } from '@storybook/testing-library';
import { POST_VOTE_MUTATION } from '@/hooks/mutation/useVote';

const meta: Meta<typeof VoteSection> = {
	title: 'VoteSection',
	component: VoteSection,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VoteSection>;

export const Default: Story = {
	args: {
		karma: 2,
	},
};

export const UpVoted: Story = {
	args: {
		karma: 2,
		type: 'post',
		direction: 'row',
		voteValue: null,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const upVoteButton = canvas.getByLabelText('Up Vote');
		await userEvent.click(upVoteButton);
	},
	parameters: {
		apolloClient: {
			mocks: [
				{
					request: {
						query: POST_VOTE_MUTATION,
						variables: {
							value: 1,
							postId: '1',
						},
					},
					result: {
						data: {
							makeVote: {
								id: '1',
								value: 1,
								userId: '123',
								postId: '1',
							},
						},
					},
				},
			],
		},
		nextAuthMock: {
			session: {
				data: {
					user: {
						id: '123',
						email: 'johndoe@gmail.ocm',
						name: 'John Doe',
					},
				},
				status: 'authenticated',
			},
		},
	},
};

export const DownVoted: Story = {
	args: {
		karma: 20,
		type: 'post',
		direction: 'row',
		voteValue: null,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const downVoteButton = canvas.getByLabelText('Down Vote');
		await userEvent.click(downVoteButton);
	},
	parameters: {
		apolloClient: {
			mocks: [
				{
					request: {
						query: POST_VOTE_MUTATION,
						variables: {
							value: -1,
							postId: '1',
						},
					},
					result: {
						data: {
							makeVote: {
								id: '1',
								value: -1,
								userId: '123',
								postId: '1',
							},
						},
					},
				},
			],
		},
		nextAuthMock: {
			session: {
				data: {
					user: {
						id: '123',
						email: 'johndoe@gmail.ocm',
						name: 'John Doe',
					},
				},
				status: 'authenticated',
			},
		},
	},
};
