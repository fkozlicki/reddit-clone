import { useClickAway } from '@/hooks/useClickAway';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, {
	HTMLAttributes,
	ReactElement,
	ReactNode,
	cloneElement,
	useState,
} from 'react';

const dropdown = cva(
	'absolute top-full right-0 py-2 shadow bg-primary z-20 w-full'
);

type DropdownItem = {
	text: ReactNode;
	icon?: ReactNode;
	onClick?: () => void;
};

interface DropdownProps extends HTMLAttributes<HTMLUListElement> {
	children: ReactElement;
	items: DropdownItem[];
}

const Dropdown = ({ items, children, className, ...props }: DropdownProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const dropdownRef = useClickAway<HTMLDivElement>(() => {
		setOpen(false);
	});

	const toggleDropdown = () => {
		setOpen((prev) => !prev);
	};

	return (
		<div ref={dropdownRef} className="relative">
			{cloneElement(children, {
				onClick: (event: MouseEvent) => {
					event.stopPropagation();
					toggleDropdown();
					if (children.props.onClick) {
						children.props.onClick();
					}
				},
			})}
			{open && (
				<ul className={cn(dropdown({ className }))} {...props}>
					{items.map(({ icon, text, onClick }, index) => (
						<li
							key={index}
							className={cn(
								'text-sm px-4 py-2 hover:bg-primary-hover flex gap-2 relative [&>a]:after:absolute [&>a]:after:w-full [&>a]:after:h-full [&>a]:after:left-0 [&>a]:after:top-0 text-primary',
								{
									'cursor-pointer': onClick,
								}
							)}
							onClick={() => {
								onClick && onClick();
								toggleDropdown();
							}}
						>
							{icon && icon}
							{text}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
