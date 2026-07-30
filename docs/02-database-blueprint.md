# HambakTech Smart Digital Platform
## Database Blueprint
Version: 1.0

---

# Overview

This document defines the complete database architecture for the HambakTech Smart Digital Platform.

Principles:

- Database-first architecture
- No unnecessary hardcoded data
- UUID primary keys
- Dynamic configuration
- Auditability
- Scalability
- Future international expansion

---

# Module 1 — Company

Purpose:
Stores company information and website configuration.

Models

- CompanySettings
- WebsiteSettings

Responsibilities

- Company profile
- Contact details
- Branding
- Logo
- Business information
- SEO
- Homepage content
- Maintenance mode

---

# Module 2 — Authentication

Purpose:
Manages platform users and permissions.

Models

- User
- Role
- Permission
- RolePermission

Responsibilities

- Login
- Registration
- Password security
- Role-Based Access Control (RBAC)
- User management

---

# Module 3 — Services

Purpose:
Stores every service offered by HambakTech.

Models

- ServiceCategory
- Service
- ServiceRequest

Responsibilities

- Service catalog
- Pricing
- Featured services
- Customer requests
- Request status

---

# Module 4 — Wallet

Purpose:
Handles customer balances and transactions.

Models

- Wallet
- WalletTransaction

Responsibilities

- Wallet balance
- Funding
- Payments
- Refunds
- Transaction history

---

# Module 5 — Orders

Purpose:
Tracks customer purchases.

Models

- Order
- OrderItem

Responsibilities

- Orders
- Order items
- Receipts
- Status tracking

---

# Module 6 — Payments

Purpose:
Records all payment activities.

Models

- Payment

Supported Providers

- Paystack
- Flutterwave
- Remita
- Manual Bank Transfer

Responsibilities

- Payment records
- Verification
- Refunds
- Receipts

---

# Module 7 — Academy

Purpose:
Manages HambakTech Academy.

Models

- Course
- Student
- Enrollment
- Certificate

Responsibilities

- Admissions
- Student records
- Training
- Certificates
- Verification

---

# Module 8 — NIN Services

Purpose:
Manages NIN-related requests.

Models

- NINRequest
- NINDocument

Responsibilities

- New enrollment
- Modification
- Lost slip
- Document uploads
- Status tracking

---

# Module 9 — Notifications

Purpose:
Delivers notifications.

Models

- Notification

Responsibilities

- Email notifications
- SMS notifications
- Dashboard alerts

---

# Module 10 — Audit

Purpose:
Tracks system activity.

Models

- AuditLog
- ActivityLog

Responsibilities

- User actions
- Security logs
- Admin activity
- Compliance

---

# Future Modules

Version 1.5

- AI Assistant
- AI Chat History

Version 2.0

- Mobile Devices
- Push Notifications

Version 3.0

- Multi-country support
- Multi-currency
- Multi-language

---

# Database Standards

Primary Keys

- UUID

Soft Deletes

- Where applicable

Timestamps

- createdAt
- updatedAt

Naming Convention

Models

PascalCase

Example

User

Fields

camelCase

Example

firstName

Relationships

Explicit Prisma relations

Validation

Database constraints
+
Application validation

Security

- Password hashing
- RBAC
- Audit logs
- Activity tracking

---

Status

Current Phase

Database Design

Approval

Approved