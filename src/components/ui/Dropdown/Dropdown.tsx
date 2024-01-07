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

const dropdown = cva('absolute top-full right-0 py-2 shadow bg-white');

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
		<div ref={dropdownRef} className="relative w-fit">
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
								'text-sm px-4 py-2 hover:bg-gray-100 flex gap-2 relative [&>a]:after:absolute [&>a]:after:w-full [&>a]:after:h-full [&>a]:after:left-0',
								{
									'cursor-pointer': onClick,
								}
							)}
							onClick={onClick}
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
