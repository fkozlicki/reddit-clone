import Button from '@/components/ui/Button/Button';
import Textarea from '@/components/ui/Textarea/Textarea';
import useUpdateCommunity from '@/hooks/mutation/useUpdateCommunity';
import { useClickAway } from '@/hooks/useClickAway';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const descriptionSchema = z.object({
	description: z.string().max(200).nullable(),
});
type DescriptionValues = z.infer<typeof descriptionSchema>;

interface CommunityDescriptionFormProps {
	id: string;
	description: string | null;
}

const CommunityDescriptionForm = ({
	id,
	description,
}: CommunityDescriptionFormProps) => {
	const [descriptionInputOpen, setDescriptionInputOpen] =
		useState<boolean>(false);
	const formWrapper = useClickAway<HTMLDivElement>(() => {
		setDescriptionInputOpen(false);
	});
	const { handleSubmit, register, watch } = useForm<DescriptionValues>({
		resolver: zodResolver(descriptionSchema),
		defaultValues: {
			description,
		},
	});
	const [changeDescription, { loading }] = useUpdateCommunity({
		onCompleted() {
			setDescriptionInputOpen(false);
		},
		refetchQueries: ['Community'],
	});

	const remaining = 200 - (watch('description')?.length ?? 0);

	const onSubmit = ({ description }: DescriptionValues) => {
		changeDescription({
			variables: {
				id,
				description,
			},
		});
	};

	const openDescriptionInput = () => {
		if (!descriptionInputOpen) {
			setDescriptionInputOpen(true);
		}
	};

	const closeDescriptionInput = () => {
		if (descriptionInputOpen) {
			setDescriptionInputOpen(false);
		}
	};

	return (
		<div
			ref={formWrapper}
			onClick={openDescriptionInput}
			className="p-2 border border-input mb-3 rounded hover:border-primary cursor-pointer bg-primary"
		>
			{descriptionInputOpen ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Textarea
						{...register('description')}
						autoFocus
						className="resize-none no-scrollbar border-none p-0 bg-primary"
						placeholder="Tell us about your community"
						maxLength={200}
					/>
					<div className="flex justify-between text-xs items-center">
						<div className="text-primary">{remaining} characters remaining</div>
						<div className="flex items-center gap-1">
							<Button
								disabled={loading}
								variant="text"
								size="small"
								shape="square"
								onClick={closeDescriptionInput}
							>
								Cancel
							</Button>
							<Button
								disabled={loading}
								loading={loading}
								shape="square"
								variant="text"
								size="small"
							>
								Save
							</Button>
						</div>
					</div>
				</form>
			) : (
				<div className="text-primary text-xs font-semibold">
					{description ?? 'Add description'}
				</div>
			)}
		</div>
	);
};

export default CommunityDescriptionForm;
