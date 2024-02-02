import { Meta, StoryObj } from '@storybook/react';
import PremiumCTA from './PremiumCTA';
import '../../../app/globals.css';

const meta: Meta<typeof PremiumCTA> = {
	title: 'PremiumCTA',
	component: PremiumCTA,
	tags: ['autodocs'],
	decorators: (Story) => {
		return (
			<div className="max-w-[300px]">
				<Story />
			</div>
		);
	},
};

export default meta;
type Story = StoryObj<typeof PremiumCTA>;

export const Default: Story = {};
