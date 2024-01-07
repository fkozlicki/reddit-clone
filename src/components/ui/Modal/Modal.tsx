import React, { HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import Button from '@/components/ui/Button/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useClickAway } from '@/hooks/useClickAway';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const modal = cva('bg-white p-4 min-w-[500px] rounded-md');

interface ModalProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof modal> {
	open: boolean;
	onClose: () => void;
	onOk?: () => void;
	title: string;
	footer?: boolean;
	okProps?: {
		loading?: boolean;
		disabled?: boolean;
	};
}

const Modal = ({
	open,
	onClose,
	children,
	onOk,
	title,
	className,
	footer = true,
	okProps,
}: ModalProps) => {
	const content = useClickAway<HTMLDivElement>(onClose);

	if (!open) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className="fixed w-screen h-screen bg-black/40 flex justify-center items-center top-0 z-20">
			<div ref={content} className={cn(modal({ className }))}>
				<div className="flex items-center justify-between mb-6">
					<div>{title}</div>
					<Button
						variant="secondary"
						onClick={onClose}
						icon={<XMarkIcon width={18} />}
						aria-label="Close"
						shape="square"
						size="small"
					/>
				</div>
				<div>{children}</div>
				{footer && (
					<div className="flex gap-2 justify-end">
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={onOk} variant="primary" {...okProps}>
							OK
						</Button>
					</div>
				)}
			</div>
		</div>,
		document.getElementById('portal')!
	);
};

export default Modal;
