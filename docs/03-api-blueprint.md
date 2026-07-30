# HambakTech Smart Digital Platform
## API Blueprint
Version: 1.0

---

# API Principles

- RESTful endpoints
- JSON request/response
- Authentication required where appropriate
- Role-based authorization
- Input validation with Zod
- Consistent error responses

---

# Authentication

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

---

# Users

GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id

---

# Company

GET    /api/company
PATCH  /api/company

GET    /api/website
PATCH  /api/website

---

# Services

GET    /api/services
POST   /api/services

GET    /api/services/:id
PATCH  /api/services/:id
DELETE /api/services/:id

GET    /api/service-categories
POST   /api/service-categories

---

# Service Requests

GET    /api/service-requests
POST   /api/service-requests

PATCH  /api/service-requests/:id

---

# Wallet

GET    /api/wallet
POST   /api/wallet/fund

GET    /api/wallet/transactions

---

# Orders

GET    /api/orders
POST   /api/orders

GET    /api/orders/:id

---

# Payments

POST   /api/payments/paystack
POST   /api/payments/flutterwave
POST   /api/payments/remita

POST   /api/payments/webhook

---

# Academy

GET    /api/courses
POST   /api/courses

GET    /api/students
POST   /api/students

GET    /api/enrollments
POST   /api/enrollments

---

# NIN

GET    /api/nin
POST   /api/nin

PATCH  /api/nin/:id

---

# Notifications

GET    /api/notifications
PATCH  /api/notifications/:id/read

---

# Audit Logs

GET    /api/audit-logs

---

Status

Approved