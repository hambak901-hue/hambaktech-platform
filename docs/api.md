# HambakTech API Documentation

## 1. Overview

The HambakTech platform uses the Next.js App Router for application routes and API endpoints.

API routes are located under:

src/app/api/

Business logic is separated into reusable services under:

src/services/

Server-side mutations are handled through:

src/actions/

The API architecture is designed to support:

- Authentication
- User management
- Services
- Service requests
- Orders
- Wallet
- Payments
- Academy
- NIN Centre
- Notifications
- Reports
- AI Assistant

---

## 2. Current API Structure

Current authentication API:

```text
src/app/api/auth/[...nextauth]/route.ts