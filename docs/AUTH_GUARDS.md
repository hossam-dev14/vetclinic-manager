# 🔐 Auth & Role-Based UI Guard Patterns — VetClinic Manager

This document defines how **authentication** and **role-based authorization**
must be handled in the frontend UI.

It ensures:
- Secure UI access
- Predictable navigation
- Clean separation of concerns
- Consistent AI-generated code (Copilot, Trae, ChatGPT)

---

## 🧠 Core Principles

- Authentication controls **access**
- Authorization controls **visibility**
- Backend is the source of truth
- Frontend guards are UX protection (not security alone)
- Role logic must be centralized

---

## 👤 User Model (Frontend)

The authenticated user object MUST follow this shape:

```ts
type User = {
  id: number
  name: string
  email: string
  role: "admin" | "vet"
}
