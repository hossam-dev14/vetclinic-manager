# Component Guide

This document provides guidance on using key components in the VetClinic Manager application, including forms, tables, and modals.

## 🧠 General Component Rules

- Components must be **reusable**
- Prefer **functional components**
- Prefer **composition over duplication**
- Avoid inline styles
- Use Tailwind utility classes only
- Do NOT invent colors, spacing, or typography
- Respect role-based visibility (admin / vet)
- Auth & role-based UI guard patterns
- Reusable React component templates
- `FORM_VALIDATION.md` using Zod

---

## 📁 Recommended Folder Structure

```txt
src/
 ├─ components/
 │   ├─ ui/          # Generic reusable UI
 │   ├─ layout/      # Layout components
 │   ├─ forms/       # Form-specific components
 │   ├─ tables/      # Table-related components
 │   └─ feedback/    # Alerts, toasts, modals
```

--- 

## Forms

Forms are located in `src/components/forms/`. They use React Hook Form for validation and Tailwind CSS for styling.

### Usage

```tsx
import { useForm } from 'react-hook-form';
import { Form } from '../components/forms/Form';

const MyForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </Form>
  );
};
```

## Tables

Tables are in `src/components/table/`. They display data in a tabular format with sorting and pagination.

### Usage

```tsx
import { Table } from '../components/table/Table';

const MyTable = ({ data }) => {
  return (
    <Table
      columns={['Name', 'Species']}
      data={data}
      renderRow={(item) => [item.name, item.species]}
    />
  );
};
```

## Modals

Modals are in `src/components/modals/`. They provide overlay dialogs for confirmations or additional input.

### Usage

```tsx
import { Modal } from '../components/modals/Modal';

const MyComponent = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Confirm Action</h2>
      <button onClick={onClose}>OK</button>
    </Modal>
  );
};
```

Ensure components are consistent with the design system and handle accessibility properly.