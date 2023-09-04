import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Button from '../../buttons/Button/Button';
import AuthButton from '../../buttons/AuthButton/AuthButton';
import googleImage from '../../../../public/google.svg';
import AnimatedInput from '../../inputs/AnimatedInput/AnimatedInput';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface SignInForm {
	closeModal: () => void;
}

const signInSchema = z.object({
	email: z.string().email().min(1),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignInForm = ({ closeModal }: SignInForm) => {
	const { handleSubmit, register } = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = ({ email }: SignInValues) => {
		signIn('email', {
			email,
		});
	};

	return (
		<div className="w-[400px] p-12 border rounded-xl flex justify-center relative bg-primary">
			<div className="mt-16">
				<div className="text-xl font-medium mb-12 text-primary">Sign In</div>
				<AuthButton
					image={googleImage}
					text="Continue with Google"
					onClick={() => signIn('google')}
				/>
				<div className="my-6 flex items-center">
					<div className="border-b border-input w-full" />
					<div className="px-4 text-sm text-primary font-medium">OR</div>
					<div className="border-b border-input w-full" />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AnimatedInput label="Email" register={register('email')} />
					<Button
						color="orange"
						filled
						classNames="w-[300px] h-[40px]"
						type="submit"
					>
						Sign In
					</Button>
				</form>
			</div>
			<button
				onClick={closeModal}
				className="ml-auto block absolute top-4 right-4"
			>
				<XMarkIcon width={18} />
			</button>
		</div>
	);
};

export default SignInForm;
