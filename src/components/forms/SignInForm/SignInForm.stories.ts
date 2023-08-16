import { Meta, StoryObj } from '@storybook/react';
import SignInForm from './SignInForm';
import '../../../app/globals.css';

const meta: Meta<typeof SignInForm> = {
	title: 'Forms/SignInForm',
	component: SignInForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignInForm>;

export const Default: Story = {};
