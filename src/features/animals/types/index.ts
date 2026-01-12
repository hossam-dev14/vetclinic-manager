import { z } from 'zod';

// Schema
export const animalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  species: z.enum(['Dog', 'Cat', 'Bird', 'Other'], {
    errorMap: () => ({ message: 'Invalid species' }),
  }),
  ownerId: z.string().min(1, 'Owner is required'),
});

// Types
export type Animal = z.infer<typeof animalSchema>;
