import { Meta, StoryObj } from '@storybook/react';
import '../../../app/globals.css';
import Modal from './Modal';
import Button from '@/components/ui/Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
	title: 'ui/Modal',
	component: Modal,
	tags: ['autodocs'],
	decorators: [
		(Story) => {
			const [modalOpen, setModalOpen] = useState<boolean>(false);

			return (
				<>
					<Button onClick={() => setModalOpen(true)}>Open</Button>
					<Story open={modalOpen} onClose={() => setModalOpen(false)} />
					<div id="portal"></div>
				</>
			);
		},
	],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	args: {
		children: 'Modal body',
		title: 'Modal',
	},
	render: (args, context) => {
		return <Modal {...args} open={context.open} onClose={context.onClose} />;
	},
};
