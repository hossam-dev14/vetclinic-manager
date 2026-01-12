import { z } from 'zod';

// Schema
export const consultationSchema = z.object({
  id: z.string().optional(),
  animalId: z.string().min(1, 'Animal is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  summary: z.string().min(1, 'Summary is required'),
});

// Types
export type Consultation = z.infer<typeof consultationSchema>;
