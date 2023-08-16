import { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';
import '../../../app/globals.css';

const meta: Meta<typeof Navbar> = {
	title: 'Navbar',
	component: Navbar,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
	parameters: {
		nextAuthMock: {
			session: {
				data: {
					user: {
						id: 999,
						email: 'user@local',
						name: 'John Doe',
					},
				},
				status: 'unauthenticated',
			},
		},
	},
};
