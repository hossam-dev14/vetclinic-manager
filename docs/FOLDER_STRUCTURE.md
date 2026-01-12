# Folder Structure

This document explains the organization of the `src/` directory in the VetClinic Manager application.

## Overview

The `src/` folder is organized into the following structure:

```
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── assets/
├── components/
│   ├── cards/
│   ├── feedback/
│   ├── forms/
│   ├── layout/
│   ├── modals/
│   ├── navigation/
│   ├── table/
│   └── ui/
├── config/
├── constants/
├── data/
│   └── db.json
├── features/
│   ├── animals/
│   ├── consultations/
│   ├── documents/
│   └── owners/
├── hooks/
├── lib/
│   ├── api.ts
│   └── validators.ts
├── store/
├── styles/
└── types/
```

## Explanation

- **assets/**: Static assets like images, icons (use SVG icons from Lucide as per the design system).
- **components/**: Reusable UI components, organized by type (cards, forms, etc.). This folder will utilize Shadcn UI for consistent, accessible, and customizable components, adhering to the design system's guidelines for buttons, forms, and layout.
- **config/**: Configuration files.
- **constants/**: Constant values used across the app, including color palette and spacing scales defined in the design system.
- **data/**: Mock data, including `db.json` for json-server.
- **features/**: Feature-specific code, organized by domain (animals, owners, etc.).
- **hooks/**: Custom React hooks.
- **lib/**: Utility libraries, such as API functions and validators.
- **store/**: State management using Zustand for global state, providing a lightweight and simple solution for managing application state across components.
- **styles/**: Additional stylesheets, following the design system's color palette, typography (Inter font), and spacing rules.
- **types/**: TypeScript type definitions.

## Design System Alignment

All UI elements in this structure must follow the guidelines in `DESIGN_SYSTEM.md`, including typography, colors, shadows, border radius, and component standards. Refer to the design system for details on reusable components like buttons, forms, and icons.

This structure promotes separation of concerns and makes the codebase easier to navigate and maintain.