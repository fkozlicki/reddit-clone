import { Meta, StoryObj } from '@storybook/react';
import CommentsSection from './CommentsSection';
import '../../../app/globals.css';

const meta: Meta<typeof CommentsSection> = {
	title: 'CommentsSection',
	component: CommentsSection,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentsSection>;

export const Default: Story = {
	args: {
		postId: '1',
		comments: [],
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};

export const WithComments: Story = {
	args: {
		comments: [
			{
				id: '1',
				author: {
					id: '123',
					name: 'John Doe',
					image: null,
				},
				content: 'Lorem ipsum dolor sit amet.',
				createdAt: new Date(),
				replies: [],
				karma: 0,
				voteValue: null,
			},
			{
				id: '2',
				author: {
					id: '456',
					name: 'Anne Doe',
					image: null,
				},
				content: 'Lorem ipsum dolor sit amet.',
				createdAt: new Date(),
				karma: 0,
				voteValue: null,
				replies: [
					{
						author: {
							id: '789',
							name: 'John Doe',
							image: null,
						},
						content: '123',
						createdAt: new Date(),
						id: '4',
						replies: [],
						karma: 0,
						voteValue: null,
					},
				],
			},
		],
		postId: '1',
	},
	parameters: {
		nextjs: {
			appDirectory: true,
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
				status: 'unauthenticated',
			},
		},
	},
};
