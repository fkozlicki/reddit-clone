import { Meta, StoryObj } from '@storybook/react';
import PremiumCTA from './PremiumCTA';
import '../../app/globals.css';

const meta: Meta<typeof PremiumCTA> = {
	title: 'PremiumCTA',
	component: PremiumCTA,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PremiumCTA>;

export const Default: Story = {};
