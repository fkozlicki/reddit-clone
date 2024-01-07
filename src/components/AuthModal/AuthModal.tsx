import React from 'react';
import Modal from '@/components/ui/Modal/Modal';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import AnimatedInput from '@/components/inputs/AnimatedInput/AnimatedInput';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';

interface AuthModalProps {
	open: boolean;
	onClose: () => void;
}

const signInSchema = z.object({
	email: z.string().email().min(1),
});

type SignInValues = z.infer<typeof signInSchema>;

const AuthModal = ({ open, onClose }: AuthModalProps) => {
	const { handleSubmit, register } = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = ({ email }: SignInValues) => {
		signIn('email', {
			email,
		});
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Sign In"
			onOk={handleSubmit(onSubmit)}
			className="min-w-[350px] p-6"
			footer={false}
		>
			<div className="mt-16">
				<Button
					onClick={() => signIn('google')}
					icon={
						<Image
							src="/google.svg"
							alt=""
							width={16}
							height={16}
							className="mr-2"
						/>
					}
					size="large"
					className="w-full"
				>
					Continue with Google
				</Button>
				<div className="my-6 flex items-center">
					<div className="border-b border-input w-full" />
					<div className="px-4 text-sm text-primary font-medium">OR</div>
					<div className="border-b border-input w-full" />
				</div>
				<form>
					<AnimatedInput label="Email" register={register('email')} />
					<Button variant="primary" className="w-full" size="large">
						Sign In
					</Button>
				</form>
			</div>
		</Modal>
	);
};

export default AuthModal;
