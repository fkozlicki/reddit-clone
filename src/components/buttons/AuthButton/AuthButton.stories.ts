import { Meta, StoryObj } from '@storybook/react';
import AuthButton from './AuthButton';
import '../../../app/globals.css';
import { StarIcon } from '@heroicons/react/24/solid';
import googleImage from '../../../../public/google.svg';

const meta: Meta<typeof AuthButton> = {
	title: 'Buttons/AuthButton',
	component: AuthButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthButton>;

export const Default: Story = {
	args: {
		image: googleImage,
		text: 'Continue with Google',
		onClick: () => {},
	},
};
