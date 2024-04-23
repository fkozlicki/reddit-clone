import { useClickAway } from '@/hooks/useClickAway';
import { cn } from '@/lib/utils';
import { CaretDown } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React, {
	HTMLAttributes,
	ReactElement,
	ReactNode,
	cloneElement,
	useState,
} from 'react';

const dropdown = cva(
	'absolute top-full right-0 py-2 shadow-xl bg-primary z-20 w-full'
);

const listItemClassNames =
	'text-sm px-4 py-2 hover:bg-btn-text flex gap-2 relative [&>a]:after:absolute [&>a]:after:w-full [&>a]:after:h-full [&>a]:after:left-0 [&>a]:after:top-0 text-primary items-center';

type DropdownItem = {
	text: ReactNode;
	icon?: ReactNode;
	onClick?: () => void;
	items?: DropdownItem[];
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
	const [showInnerList, setShowInnerList] = useState<boolean>(false);

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
					{items.map(({ icon, text, onClick, items }, index) => (
						<li key={index}>
							<span
								className={cn(listItemClassNames, {
									'cursor-pointer': onClick || items,
								})}
								onClick={() => {
									if (items) {
										setShowInnerList((prev) => !prev);
									} else {
										toggleDropdown();
									}
									onClick && onClick();
								}}
							>
								{icon && icon}
								{text}
								{items && <CaretDown className="ml-auto" size={18} />}
							</span>
							{items && showInnerList && (
								<ul className="max-h-[336px] overflow-auto mobile-scrollbar mobile-scrollbar-vertical">
									{items.map(({ icon, text, onClick }, index) => (
										<li key={index}>
											<span
												className={cn(listItemClassNames, 'pl-11', {
													'cursor-pointer': onClick,
												})}
												onClick={() => {
													onClick && onClick();
													toggleDropdown();
												}}
											>
												{icon && icon}
												{text}
											</span>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
