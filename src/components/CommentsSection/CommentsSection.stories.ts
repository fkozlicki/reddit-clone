import { Meta, StoryObj } from '@storybook/react';
import CommentsSection from './CommentsSection';
import '../../app/globals.css';

const meta: Meta<typeof CommentsSection> = {
	title: 'CommentsSection',
	component: CommentsSection,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentsSection>;

export const Default: Story = {
	args: {
		initialComments: [],
		postId: '1',
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};

export const WithComments: Story = {
	args: {
		initialComments: [
			{
				id: '1',
				author: {
					id: '1',
					name: 'John Doe',
					createdAt: new Date(),
					email: 'johndoe@gmail.com',
					about: null,
					displayName: null,
					emailVerified: null,
					image: null,
				},
				authorId: '1',
				content: 'Lorem ipsum dolor sit amet.',
				createdAt: new Date(),
				postId: '1',
				replies: [],
				votes: [],
				replyToId: null,
			},
			{
				id: '2',
				author: {
					id: '2',
					name: 'Anne Doe',
					createdAt: new Date(),
					email: 'annedoe@gmail.com',
					about: null,
					displayName: null,
					emailVerified: null,
					image: null,
				},
				authorId: '2',
				content: 'Lorem ipsum dolor sit amet.',
				createdAt: new Date(),
				postId: '1',
				replies: [
					{
						author: {
							id: '1',
							name: 'John Doe',
							createdAt: new Date(),
							email: 'johndoe@gmail.com',
							about: null,
							displayName: null,
							emailVerified: null,
							image: null,
						},
						authorId: '1',
						content: '123',
						createdAt: new Date(),
						id: '4',
						postId: '1',
						replyToId: '2',
						votes: [],
					},
				],
				votes: [],
				replyToId: null,
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
