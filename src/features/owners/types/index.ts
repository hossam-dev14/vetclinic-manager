import { z } from 'zod';

// Schema
export const ownerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

// Types
export type Owner = z.infer<typeof ownerSchema>;
