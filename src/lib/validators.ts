import { z } from 'zod';

// Owner Schema
export const ownerSchema = z.object({
  id: z.string(), // Optional for new entries
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
});

// Animal Schema
export const animalSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  species: z.enum(['Dog', 'Cat', 'Bird', 'Other'], 'Invalid species'),
  ownerId: z.string().min(1, 'Owner is required'),
});

// Consultation Schema
export const consultationSchema = z.object({
  id: z.string(),
  animalId: z.string().min(1, 'Animal is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  summary: z.string().min(1, 'Summary is required'),
});

// Document Schema
export const documentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required').endsWith('.pdf', 'Must be a PDF file'),
  animalId: z.string().min(1, 'Animal is required'),
});

export type Owner = z.infer<typeof ownerSchema>;
export type Animal = z.infer<typeof animalSchema>;
export type Consultation = z.infer<typeof consultationSchema>;
export type Document = z.infer<typeof documentSchema>;
