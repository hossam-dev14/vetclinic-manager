import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../types';
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

export function ResetPasswordForm() {
	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: ResetPasswordFormValues) => {
		void data;
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight text-[#000000]">
						Reset password
					</h1>
					<div className="flex items-center justify-between text-sm">
						<span className="text-[#666666]">Don&apos;t have account yet?</span>
						<Link
							to="/register"
							className="font-medium text-[#007BFF] hover:underline"
						>
							Sign up
						</Link>
					</div>
				</div>

				<div className="space-y-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" size="lg" className="w-full">
					Reset Password
				</Button>
			</form>
		</Form>
	);
}

