import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormValues } from '../types';
import { useAuthActions, useAuthLoading, useAuthError } from '../../../store/authStore';
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
import { Checkbox } from '../../../components/forms/Checkbox';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuthActions();
  const isLoading = useAuthLoading();
  const error = useAuthError();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Mock user data for now
    const mockUser = {
      id: 1,
      name: 'Dr. Joe',
      email: data.email,
      role: 'vet' as const,
    };

    await login(mockUser);
    navigate('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#000000]">Welcome Back</h1>
          <p className="text-[#666666]">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#666666]"
                  >
                    Remember me
                  </label>
                </div>
              )}
            />
            <a href="/forgot-password" className="text-sm font-medium text-[#007BFF] hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="text-center text-sm text-[#666666]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#007BFF] hover:underline">
            Create one
          </Link>
        </div>
      </form>
    </Form>
  );
}
