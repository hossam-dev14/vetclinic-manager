# Page Structure and Implementation Plan

This document outlines the structure of the web pages to be implemented, following the design system and project requirements.

## 1. Authentication
- **Login Page** (`/login`):
  - Split screen layout (Illustration on left, Form on right).
  - Form fields: Email, Password.
  - "Remember me" checkbox.
  - "Forgot password?" link.
  - "Log in" button (Primary).
  - Validation using Zod.

## 2. Dashboard
- **Dashboard Page** (`/`):
  - Welcome message ("Welcome back, Joe!").
  - Stats Cards:
    - Animals (Blue background).
    - Consultations (Light background).
    - Documents (Light background).
  - Quick Actions or Recent Activity (Future scope).

## 3. Core Features
- **Owners** (`/owners`): List and manage pet owners.
- **Animals** (`/animals`): List and manage animals.
- **Consultations** (`/consultations`): Schedule and view consultations.
- **Documents** (`/documents`): Manage veterinary documents.

## 4. Layout
- **Sidebar**:
  - Fixed left navigation.
  - Blue background (`#007BFF`) with White text.
  - Logo: "VetClinic Manager".
  - Navigation links with icons (Lucide).
  - User profile / Logout at the bottom.
- **Navbar**:
  - Page title.
  - Search bar (optional).
  - User profile summary.

## Implementation Details
- **Tech Stack**: React, TypeScript, Tailwind CSS, React Query, React Hook Form, Zod.
- **Styling**: `clsx`, `tailwind-merge`, `cva` for component variants.
- **Icons**: `lucide-react`.