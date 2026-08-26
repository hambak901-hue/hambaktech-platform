# HambakTech Smart Digital Platform
## Database Relationships
Version: 1.0

---

# Overview

This document defines how all database models relate to each other.

---

# Company

CompanySettings

No direct relationships.

WebsiteSettings

No direct relationships.

---

# Authentication

Role

1 Role
    ↓
Many Users

Role

1 Role
    ↓
Many RolePermissions

Permission

1 Permission
    ↓
Many RolePermissions

User

1 User
    ↓
Many ServiceRequests

1 User
    ↓
1 Wallet

1 User
    ↓
Many Orders

1 User
    ↓
Many Payments

1 User
    ↓
Many Notifications

1 User
    ↓
Many AuditLogs

---

# Services

ServiceCategory

1 Category
    ↓
Many Services

Service

1 Service
    ↓
Many ServiceRequests

ServiceRequest

Belongs To

- User
- Service

---

# Wallet

Wallet

Belongs To

- User

Wallet

1 Wallet
    ↓
Many WalletTransactions

WalletTransaction

Belongs To

- Wallet

---

# Orders

Order

Belongs To

- User

Order

1 Order
    ↓
Many OrderItems

OrderItem

Belongs To

- Order

Belongs To

- Service

---

# Payments

Payment

Belongs To

- User

Payment

May Belong To

- WalletTransaction

Payment

May Belong To

- Order

---

# Academy

Course

1 Course
    ↓
Many Enrollments

Student

1 Student
    ↓
Many Enrollments

Enrollment

Belongs To

- Student

Belongs To

- Course

Certificate

Belongs To

- Enrollment

---

# NIN

NINRequest

Belongs To

- User

NINDocument

Belongs To

- NINRequest

---

# Notifications

Notification

Belongs To

- User

---

# Audit

AuditLog

Belongs To

- User

ActivityLog

Belongs To

- User

---

# Relationship Summary

User

├── Role

├── Wallet

├── Orders

├── Payments

├── Notifications

├── Service Requests

├── NIN Requests

├── Audit Logs

└── Activity Logs

---

Current Status

Approved