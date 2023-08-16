import { Meta, StoryObj } from '@storybook/react';
import LinkButton from './LinkButton';
import '../../../app/globals.css';
import { StarIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof LinkButton> = {
	title: 'Buttons/LinkButton',
	component: LinkButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
	args: {
		text: 'LinkButton',
	},
};

export const WithIcon: Story = {
	args: {
		icon: <StarIcon width={20} />,
		text: 'LinkButton',
	},
};
