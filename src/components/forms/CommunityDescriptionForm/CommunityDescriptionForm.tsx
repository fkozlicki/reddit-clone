import { useClickAway } from '@/hooks/useClickAway';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Spinner from '../../Spinner/Spinner';
import useUpdateCommunity from '@/hooks/mutation/useUpdateCommunity';

const descriptionSchema = z.object({
	description: z.string().max(200).nullable(),
});
type DescriptionValues = z.infer<typeof descriptionSchema>;

interface CommunityDescriptionFormProps {
	communityName: string;
	initialDescription: string | null;
	updateDescription: (description: string | null) => void;
}

const CommunityDescriptionForm = ({
	communityName,
	initialDescription,
	updateDescription,
}: CommunityDescriptionFormProps) => {
	const [charactersRemaining, setCharactersRemaining] = useState<number>(
		200 - (initialDescription?.length ?? 0)
	);
	const [descriptionInputOpen, setDescriptionInputOpen] =
		useState<boolean>(false);
	const description = useClickAway<HTMLFormElement>(() => {
		setDescriptionInputOpen(false);
	});
	const { handleSubmit, register, watch } = useForm<DescriptionValues>({
		resolver: zodResolver(descriptionSchema),
		defaultValues: {
			description: initialDescription,
		},
	});
	const [changeDescription, { loading }] = useUpdateCommunity({
		onCompleted({ updateCommunity: { description } }) {
			updateDescription(description);
			setDescriptionInputOpen(false);
		},
	});

	const onSubmit = ({ description }: DescriptionValues) => {
		changeDescription({
			variables: {
				name: communityName,
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
			onClick={openDescriptionInput}
			className="p-2 border border-input mb-2 rounded hover:border-primary cursor-pointer"
		>
			{descriptionInputOpen ? (
				<form ref={description} onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('description', {
							onChange() {
								setCharactersRemaining(
									200 - (watch('description')?.length ?? 0)
								);
							},
						})}
						autoFocus
						type="text"
						className="w-full outline-none text-sm mb-2"
						placeholder="Tell us about your community"
						maxLength={200}
					/>
					<div className="flex justify-between text-xs">
						<div className="text-primary">
							{charactersRemaining} characters remaining
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={closeDescriptionInput}
								className="font-semibold text-danger"
							>
								Cancel
							</button>
							<button
								disabled={loading}
								type="submit"
								className="font-semibold text-primary"
							>
								{loading ? <Spinner /> : 'Save'}
							</button>
						</div>
					</div>
				</form>
			) : (
				<div className="text-primary text-xs font-semibold">
					{initialDescription ?? 'Add description'}
				</div>
			)}
		</div>
	);
};

export default CommunityDescriptionForm;
