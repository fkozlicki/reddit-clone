import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import Dropdown from './Dropdown';
import Button from '../Button/Button';

const meta: Meta<typeof Dropdown> = {
	title: 'ui/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="min-h-[200px] flex justify-center">
				<div>
					<Story />
				</div>
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
	args: {
		children: <Button>Open</Button>,
		items: [{ text: 'One' }, { text: 'Two' }, { text: 'Three' }],
	},
};
