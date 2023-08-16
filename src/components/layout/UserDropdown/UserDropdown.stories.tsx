import { Meta, StoryObj } from '@storybook/react';
import UserDropdown from './UserDropdown';
import '../../../app/globals.css';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof UserDropdown> = {
	title: 'UserDropdown',
	component: UserDropdown,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="min-h-[250px]">
				<div className="flex justify-end">
					<Story />
				</div>
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

export const Opened: Story = {
	args: {
		userName: 'John Doe',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const dropdown = canvas.getByLabelText('User Dropdown');
		await userEvent.click(dropdown);
	},
};
