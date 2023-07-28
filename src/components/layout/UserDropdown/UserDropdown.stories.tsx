import { Meta, StoryObj } from '@storybook/react';
import UserDropdown from './UserDropdown';
import '../../app/globals.css';

const meta: Meta<typeof UserDropdown> = {
	title: 'UserDropdown',
	component: UserDropdown,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="flex justify-end">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof UserDropdown>;

export const Default: Story = {
	args: {
		userName: 'John Doe',
	},
};
