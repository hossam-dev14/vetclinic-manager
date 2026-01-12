# Form Validation with Zod

This document explains how to implement form validation using Zod in the VetClinic Manager application. Zod is a TypeScript-first schema validation library that ensures data integrity and provides type-safe validation.

## Overview

Zod allows you to define schemas for your data structures, validate inputs, and infer TypeScript types automatically. It integrates seamlessly with `react-hook-form` for efficient form handling.

## Installation

Zod is already included in the project dependencies (`zod: ^4.2.1`). No additional installation is required.

## Basic Usage

### Defining a Schema

Use Zod to define validation rules for your data:

```typescript
import { z } from 'zod';

// Example schema for an owner
const ownerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  phone: z.string().regex(/^\+\d{2} \d{3} \d{3} \d{4}$/, 'Invalid phone format'),
});

// Infer the TypeScript type
type Owner = z.infer<typeof ownerSchema>;
```

### Schema Examples

Based on the `db.json` structure:

#### Owner Schema
```typescript
const ownerSchema = z.object({
  id: z.string().optional(), // Optional for new entries
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
});
```

#### Animal Schema
```typescript
const animalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  species: z.enum(['Dog', 'Cat', 'Bird', 'Other'], 'Invalid species'),
  ownerId: z.string().min(1, 'Owner is required'),
});
```

#### Consultation Schema
```typescript
const consultationSchema = z.object({
  id: z.string().optional(),
  animalId: z.string().min(1, 'Animal is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  summary: z.string().min(1, 'Summary is required'),
});
```

#### Document Schema
```typescript
const documentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').endsWith('.pdf', 'Must be a PDF file'),
  animalId: z.string().min(1, 'Animal is required'),
});
```

## Integration with React Hook Form

Combine Zod with `react-hook-form` using the `@hookform/resolvers/zod` resolver (ensure it's installed if needed).

### Example Form Component

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ownerSchema } from '../lib/validators'; // Assuming schemas are in lib/validators.ts

function OwnerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ownerSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register('phone')} placeholder="Phone" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Best Practices

- Define schemas in a dedicated file (e.g., `src/lib/validators.ts`) for reusability.
- Use descriptive error messages for better user experience.
- Validate data on both client and server sides.
- Leverage Zod's type inference to ensure type safety across your app.
- For complex validations, use Zod's advanced features like `refine` for custom logic.

## Resources

- [Zod Documentation](https://zod.dev/)
- [React Hook Form with Zod](https://react-hook-form.com/get-started#SchemaValidation)

This approach ensures robust, type-safe form validation throughout the VetClinic Manager application.
