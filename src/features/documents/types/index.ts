import { z } from 'zod';
import type { Animal } from '../../animals';

// Schema
export const documentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').endsWith('.pdf', 'Must be a PDF file'),
  animalId: z.string().min(1, 'Animal is required'),
});

// Types
export type Document = z.infer<typeof documentSchema>;

export type DocumentWithAnimal = Document & {
  animal?: Animal | null;
};
