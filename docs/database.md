# HambakTech Database Documentation

## Database Engine

- PostgreSQL
- Prisma ORM

---

## Main Models

### Company

Stores company information.

### Website

Stores website configuration.

### User

Stores all registered users.

Relationships

- Role
- Wallet
- Orders
- Payments
- Student
- Service Requests

---

### Role

Stores system roles.

Examples

- Super Admin
- Admin
- Staff
- Customer
- Student

---

### Permission

Stores permissions assigned to roles.

---

### Wallet

Stores customer wallet balances.

---

### Wallet Transactions

Stores wallet credits and debits.

---

### Orders

Stores customer orders.

---

### Order Items

Stores individual services inside orders.

---

### Payments

Stores payment records.

---

### Services

Stores HambakTech services.

---

### Service Categories

Groups services.

---

### Academy

Models

- Course
- Student
- Enrollment
- Certificate

---

## Database Standards

- UUID Primary Keys
- Indexed Foreign Keys
- Cascade Deletes where appropriate
- Prisma Relations
- Timestamp Tracking

---

## Seed Data

The project includes seed scripts for:

- Roles
- Permissions
- Super Administrator
- Company Settings

---

## Future Tables

- Notifications
- Audit Logs
- Email Logs
- SMS Logs
- API Keys
- Support Tickets
- Blogs
- News
- Testimonials