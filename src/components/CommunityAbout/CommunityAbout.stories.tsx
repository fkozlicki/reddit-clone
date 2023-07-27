import { Meta, StoryObj } from '@storybook/react';
import CommunityAbout, { CommunityQuery } from './CommunityAbout';
import '../../app/globals.css';

const meta: Meta<typeof CommunityAbout> = {
	title: 'CommunityAbout',
	component: CommunityAbout,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="max-w-[312px]">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof CommunityAbout>;

export const Default: Story = {
	args: {
		withName: true,
	},
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		apolloClient: {
			mocks: [
				{
					request: {
						query: CommunityQuery,
					},
					result: {
						data: {
							community: {
								name: 'MyFirstCommunity',
								description: 'Lorem ipsum dolor amet si',
								createdAt: new Date().toISOString(),
								members: [],
								moderators: [],
								topic: {
									id: 'essa123',
								},
							},
						},
					},
				},
			],
		},
	},
};
