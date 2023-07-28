import { useClickAway } from '@/hooks/useClickAway';
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Spinner from '../../Spinner/Spinner';

const descriptionSchema = z.object({
	name: z.string().min(1),
	description: z.string().nullable(),
});

const CHANGE_DESCRIPTION_MUTATION = gql`
	mutation ($name: String!, $description: String) {
		updateCommunity(name: $name, description: $description) {
			description
		}
	}
`;

type ChangeDescriptionResponse = {
	updateCommunity: {
		description: string | null;
	};
};
type ChangeDescriptionValues = z.infer<typeof descriptionSchema>;

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
	const [descriptionInputOpen, setDescriptionInputOpen] =
		useState<boolean>(false);
	const description = useClickAway<HTMLFormElement>(() => {
		setDescriptionInputOpen(false);
	});
	const { handleSubmit, register } = useForm<ChangeDescriptionValues>({
		resolver: zodResolver(descriptionSchema),
		defaultValues: {
			name: communityName,
			description: initialDescription,
		},
	});
	const [changeDescription, { loading }] = useMutation<
		ChangeDescriptionResponse,
		ChangeDescriptionValues
	>(CHANGE_DESCRIPTION_MUTATION, {
		onCompleted({ updateCommunity: { description } }) {
			updateDescription(description);
			setDescriptionInputOpen(false);
		},
	});

	const onSubmit = ({ description, name }: ChangeDescriptionValues) => {
		changeDescription({
			variables: {
				name,
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
			className="p-2 border border-border-input mb-2 rounded hover:border-primary cursor-pointer"
		>
			{descriptionInputOpen ? (
				<form ref={description} onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('description')}
						autoFocus
						type="text"
						className="w-full outline-none text-sm mb-2"
						placeholder="Tell us about your community"
					/>
					<div className="flex justify-between text-xs">
						<div className="text-text-gray">characters remaining</div>
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
