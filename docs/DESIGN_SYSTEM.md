# 🎨 Design System — VetClinic Manager

This document defines the **UI design system** for the **VetClinic Manager** web application.
It serves as the single source of truth for UI consistency across frontend development.

The design system is based on a **clean, minimalist dashboard style**, optimized for professional medical use.

---

## 🧠 Design Principles

- Clarity over decoration
- Medical / professional tone
- Consistent spacing and hierarchy
- Accessible contrast and typography
- Reusable components

---

## 🅰️ Typography

**Font Family:** Inter  
Fallback: system-ui, sans-serif

### Text Styles

| Style | Usage |
|------|------|
| H1 | Page titles |
| H2 | Section titles |
| Paragraph | Main content |
| Label | Form labels, small text |

Typography must remain consistent across all screens.

---

## 🎨 Color Palette

### Primary Colors

| Name | Hex | Usage |
|----|----|----|
| Primary | `#007BFF` | Main actions, links |
| Secondary | `#E6F2FF` | Secondary backgrounds |

### Status Colors

| Name | Hex | Usage |
|----|----|----|
| Success | `#28A745` | Success messages |
| Danger | `#DC3545` | Errors, delete actions |
| Warning | `#FFC107` | Alerts |

### Background Colors

| Name | Hex |
|----|----|
| Background Light | `#F8F8F8` |
| Background Secondary | `#ECECEC` |

### Text Colors

| Name | Hex |
|----|----|
| Primary Text | `#000000` |
| Secondary Text | `#666666` |

---

## 🔘 Buttons

### Button Variants

- Primary
- Secondary
- Ghost
- Danger
- Disabled

### Button States

- Default
- Hover
- Disabled

Buttons must:
- Use consistent padding
- Use defined border-radius
- Follow color rules above

---

## 🧾 Form Elements

### Inputs

- Default
- Focus
- Error

### Components

- Text input
- Select dropdown
- Checkbox
- Radio button
- Date picker
- Textarea

All form fields must:
- Have visible labels
- Show validation errors clearly
- Follow accessibility rules

---

## 🌫️ Shadows

Used to indicate elevation and hierarchy.

| Type | Usage |
|----|----|
| Small | Inputs, subtle elements |
| Medium | Dropdowns |
| Card | Main containers |

Shadows must remain soft and neutral.

---

## ⭕ Border Radius

| Radius | Usage |
|-----|-----|
| 4px | Small UI elements |
| 8px | Buttons, inputs |
| 12px | Cards, modals |

---

## 🧩 Icons

### Icon Libraries

- Lucide Icons
- HeroIcons

### Icon Sizes

- 16px
- 20px
- 24px
- 32px

Icons must:
- Be SVG
- Use consistent stroke width
- Align vertically with text

---

## 🧱 Layout & Grid

- Desktop-first layout
- 12-column grid
- Consistent spacing scale:
  - 4 / 8 / 16 / 24 / 32 / 48 / 64 px

---

## 📦 Component Guidelines

Reusable components must include:

- Sidebar navigation
- Top navbar
- Tables (with empty states)
- Cards
- Modals
- Alerts & toasts

Each component should be:
- Reusable
- Stateless when possible
- Consistent with this design system

---

## 🤖 AI / Copilot Instructions

When generating UI code:
- Follow this design system strictly
- Use defined colors, spacing, and typography
- Do not invent new styles unless explicitly requested
- Prefer reusable components
- Do NOT invent new colors
- Do NOT invent spacing
- Use Tailwind tokens from theme.extend
- Use reusable components

---

## ✅ Status

This design system applies to:
- React frontend
- Tailwind / CSS styles
- UI components
- Figma designs

Any UI change must update this document.

---

**VetClinic Manager — Design System**