import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgetPasswordSchema, type ForgetPasswordFormValues } from '../types';
import { Button } from '../../../components/ui';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/forms/Form';
import { Input } from '../../../components/forms/Input';

export function ForgetPasswordForm() {
	const form = useForm<ForgetPasswordFormValues>({
		resolver: zodResolver(forgetPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: ForgetPasswordFormValues) => {
		void data;
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
				<div className="space-y-2">
					<Link
						to="/login"
						className="text-sm font-medium text-[#007BFF] hover:underline"
					>
						Back to Login ?
					</Link>
					<h1 className="text-3xl font-bold tracking-tight text-[#000000]">
						Forget Password
					</h1>
					<p className="text-sm text-[#666666]">
						Enter your email address and we&apos;ll send you a link to reset your
						password.
					</p>
				</div>

				<div className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="johndow@email.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" size="lg" className="w-full">
					Send Reset Link
				</Button>
			</form>
		</Form>
	);
}

