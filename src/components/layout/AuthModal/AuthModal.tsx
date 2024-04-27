import AnimatedInput from '@/components/ui/AnimatedInput/AnimatedInput';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface AuthModalProps {
	open: boolean;
	onClose: () => void;
}

const signInSchema = z.object({
	email: z.string().email().min(1),
});

type SignInValues = z.infer<typeof signInSchema>;

const AuthModal = ({ open, onClose }: AuthModalProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { handleSubmit, register } = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async ({ email }: SignInValues) => {
		setLoading(true);
		try {
			await signIn('email', {
				email,
			});
			toast.success('Signed in successfully');
			onClose();
		} catch {
			toast.error("Couldn't sign in");
		}
		setLoading(false);
	};

	const signInWithGoogle = async () => {
		setLoading(true);
		try {
			await signIn('google');
			toast.success('Signed in successfully');
			onClose();
		} catch {
			toast.error("Couldn't sign in");
		}
		setLoading(false);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Sign In"
			className="min-w-[350px] p-6"
			footer={false}
		>
			<div className="mt-16">
				<Button
					onClick={signInWithGoogle}
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
					loading={loading}
					disabled={loading}
				>
					Continue with Google
				</Button>
				<div className="my-6 flex items-center">
					<div className="border-b border-input w-full" />
					<div className="px-4 text-sm text-primary font-medium">OR</div>
					<div className="border-b border-input w-full" />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AnimatedInput
						label="Email"
						{...register('email')}
						disabled={loading}
					/>
					<Button
						disabled={loading}
						loading={loading}
						type="submit"
						variant="primary"
						className="w-full"
						size="large"
					>
						Sign In
					</Button>
				</form>
			</div>
		</Modal>
	);
};

export default AuthModal;
