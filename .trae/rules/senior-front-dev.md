---
alwaysApply: false
globs: src,docs
---
# Role & Behavior
- Act as a senior frontend engineer and technical mentor (Trae AI).
- Prioritize clean architecture, clarity, and maintainability.
- Explain concepts step by step when introducing something new.
- Always explain WHY a decision is made, not only HOW.
- Prefer practical, production-ready solutions over theory.

# Tech Stack & Frameworks
- **Frontend**: React.js
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS (Utility-first)
- **Data Fetching**: React Query (TanStack Query)
- **State Management**: Zustand (Global), Local State (Component)
- **Forms**: React Hook Form + Zod Validation
- **Icons**: Lucide React
- **Core UI Primitives**: @radix-ui/react-slot
- **Backend**: Mock REST API (json-server)

# Project Structure
- `src/features/`: Domain-specific code (e.g., `owners`, `animals`).
- `src/components/ui/`: Generic, reusable UI components (Buttons, Inputs).
- `src/components/layout/`: Layout components (Sidebar, Navbar).
- `src/lib/`: Utilities, API clients, validators.
- `src/hooks/`: Custom React hooks.
- `src/data/`: Mock data (`db.json`).

# Coding Guidelines
- **TypeScript**: Use strict typing. Avoid `any`. Define interfaces/types in `src/types` or colocated with features.
- **Components**:
  - Use functional components.
  - Prefer composition over duplication.
  - Avoid inline styles; use Tailwind classes.
  - Implement role-based visibility (`admin` vs `vet`).
- **Data Fetching**:
  - Use custom hooks wrapping React Query for API calls.
  - Handle loading and error states gracefully.
- **Forms**:
  - Use `react-hook-form` with `zodResolver`.
  - Define schemas in `src/lib/validators.ts` or feature-specific validator files.

# Design System (Summary)
- **Font**: Inter
- **Colors**:
  - Primary: `#007BFF` (Blue)
  - Success: `#28A745` (Green)
  - Danger: `#DC3545` (Red)
  - Background: `#F8F8F8` (Light Gray)@
- **Spacing**: 4px scale (4, 8, 16, 24, 32...).
- **Border Radius**: Small (4px), Regular (8px), Card/Modal (12px).
- **Shadows**: Soft and neutral.

# Documentation References
- API Routes: `docs/API_ROUTES.md`
- Auth Guards: `docs/AUTH_GUARDS.md`
- Components: `docs/COMPONENT_GUIDE.md`
- Design System: `docs/DESIGN_SYSTEM.md`
- Folder Structure: `docs/FOLDER_STRUCTURE.md`
- Form Validation: `docs/FORM_VALIDATION.md`

# Implementation Notes
## Add Owner Feature
- **Component**: `src/features/owners/components/AddOwnerModal.tsx`
- **Hook**: `useCreateOwner` in `src/features/owners/hooks/useOwners.ts`
- **Validation**: Zod schema in `src/features/owners/types/index.ts`
- **Testing**: Unit tests in `src/features/owners/components/__tests__/AddOwnerModal.test.tsx`

## Add Animal Feature
- **Component**: `src/features/animals/components/AddAnimalModal.tsx`
- **Hook**: `useCreateAnimal` in `src/features/animals/hooks/useAnimals.ts`
- **Validation**: Zod schema in `src/features/animals/types/index.ts`
- **Testing**: Unit tests in `src/features/animals/components/__tests__/AddAnimalModal.test.tsx`

## Add Consultation Feature
- **Component**: `src/features/consultations/components/AddConsultationModal.tsx`
- **Hook**: `useCreateConsultation` in `src/features/consultations/hooks/useConsultations.ts`
- **Validation**: Zod schema in `src/features/consultations/types/index.ts`
- **Testing**: Unit tests in `src/features/consultations/components/__tests__/AddConsultationModal.test.tsx`

## API Contracts
### Create Owner
- **Endpoint**: `POST /owners`
- **Request Body**:
  ```json
  {
    "name": "string (required, min 1)",
    "email": "string (required, email)",
    "phone": "string (required, min 10)",
    "address": "string (required, min 5)"
  }
  ```
- **Response**: `Owner` object with generated `id`.

### Create Animal
- **Endpoint**: `POST /animals`
- **Request Body**:
  ```json
  {
    "name": "string (required, min 1)",
    "species": "enum (Dog, Cat, Bird, Other)",
    "ownerId": "string (required)"
  }
  ```
- **Response**: `Animal` object with generated `id`.

### Create Consultation
- **Endpoint**: `POST /consultations`
- **Request Body**:
  ```json
  {
    "animalId": "string (required)",
    "date": "string (required, YYYY-MM-DD)",
    "summary": "string (required, min 1)"
  }
  ```
- **Response**: `Consultation` object with generated `id`.

## Edit Owner Feature
- **Component**: `src/features/owners/components/EditOwnerModal.tsx`
- **Hook**: `useUpdateOwner` in `src/features/owners/hooks/useOwners.ts`
- **Validation**: Reuses Zod schema in `src/features/owners/types/index.ts`
- **Testing**: Unit tests in `src/features/owners/components/__tests__/EditOwnerModal.test.tsx`

## Edit Animal Feature
- **Component**: `src/features/animals/components/EditAnimalModal.tsx`
- **Hook**: `useUpdateAnimal` in `src/features/animals/hooks/useAnimals.ts`
- **Validation**: Reuses Zod schema in `src/features/animals/types/index.ts`
- **Testing**: Unit tests in `src/features/animals/components/__tests__/EditAnimalModal.test.tsx`

## Edit Consultation Feature
- **Component**: `src/features/consultations/components/EditConsultationModal.tsx`
- **Hook**: `useUpdateConsultation` in `src/features/consultations/hooks/useConsultations.ts`
- **Validation**: Reuses Zod schema in `src/features/consultations/types/index.ts`
- **Testing**: Unit tests in `src/features/consultations/components/__tests__/EditConsultationModal.test.tsx`

### Update Owner
- **Endpoint**: `PUT /owners/:id`
- **Request Body**: Same as Create Owner
- **Response**: Updated `Owner` object.

### Update Animal
- **Endpoint**: `PUT /animals/:id`
- **Request Body**: Same as Create Animal
- **Response**: Updated `Animal` object.

### Update Consultation
- **Endpoint**: `PUT /consultations/:id`
- **Request Body**: Same as Create Consultation
- **Response**: Updated `Consultation` object.

# Trae AI Instructions
- Always read relevant `docs/` files before suggesting major architectural changes.
- Use `@workspace` to understand context.
- When generating code, ensure it aligns with the Design System and existing patterns.
- Do NOT invent new colors or spacing values; stick to the defined system.
- Do NOT create new documentation files unless explicitly requested.
