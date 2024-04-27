import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Modal from '@/components/ui/Modal/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ShareModalProps {
	path: string;
	open: boolean;
	onClose: () => void;
}

const ShareModal = ({ open, onClose, path }: ShareModalProps) => {
	const [copied, setCopied] = useState<boolean>(false);

	const link = `${location.origin}${path}`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(link);
		setCopied(true);
		toast.success('Copied to clipboard');
	};

	return (
		<Modal open={open} onClose={onClose} title="Share" footer={false}>
			<div className="flex gap-2">
				<Input readOnly={true} value={link} />
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

export default ShareModal;
