import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import TextField from '@/components/ui/TextField/TextField';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface SharePostModalProps {
	path: string;
	open: boolean;
	onClose: () => void;
}

const SharePostModal = ({ open, onClose, path }: SharePostModalProps) => {
	const [copied, setCopied] = useState<boolean>(false);

	const link = `${location.href}${path}`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(link);
		setCopied(true);
		toast.success('Copied to clipboard');
	};

	return (
		<Modal open={open} onClose={onClose} title="Share Post" footer={false}>
			<div className="flex gap-2">
				<TextField readOnly={true} value={link} />
				<Button
					className="shrink-0"
					onClick={copyToClipboard}
					variant="primary"
					shape="square"
					size="large"
				>
					{copied ? 'Copied' : 'Copy'}
				</Button>
			</div>
		</Modal>
	);
};

export default SharePostModal;
