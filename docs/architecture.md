# HambakTech Smart Digital Platform

## System Architecture

The HambakTech platform is designed using a layered architecture to ensure scalability, maintainability, and separation of concerns.

---

## Architecture Layers

Presentation Layer

- Next.js App Router
- React Components
- Tailwind CSS

---

Business Layer

Located inside:

src/services

Responsible for:

- Business logic
- Database queries
- Validation
- Statistics
- Reporting

---

Action Layer

Located inside:

src/actions

Responsible for:

- Form submissions
- Create
- Update
- Delete
- Server Actions

---

Data Layer

- Prisma ORM
- PostgreSQL Database

---

Authentication

- NextAuth
- Credentials Provider
- Middleware Protection

---

Admin Panel

Modules include:

- Dashboard
- User Management
- Wallet
- Orders
- Payments
- Services
- Academy
- NIN Centre
- CMS
- Reports
- Settings

---

Public Website

Modules include:

- Home
- About
- Services
- Academy
- Contact
- Authentication

---

Future Modules

- Mobile API
- AI Assistant
- Notifications
- Email Service
- SMS Service
- Payment Gateway
- Analytics

---

Project Structure

src/

actions/

app/

components/

lib/

services/

types/

middleware.ts

auth.ts

---

Design Principles

- DRY (Don't Repeat Yourself)
- Reusable Components
- Service Layer
- Server Actions
- Database Driven
- Modular Development
- Professional UI