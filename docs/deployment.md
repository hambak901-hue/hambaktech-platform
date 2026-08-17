# HambakTech Deployment Guide

## Requirements

- Node.js LTS
- PostgreSQL
- Git
- npm

---

## Installation

Clone Repository

git clone <repository>

Install Packages

npm install

---

## Environment

Configure:

.env

Required Variables

DATABASE_URL

NEXTAUTH_SECRET

NEXTAUTH_URL

---

## Database

Generate Prisma Client

npx prisma generate

Run Migration

npx prisma migrate deploy

Seed Database

npx prisma db seed

---

## Production Build

npm run build

Start Application

npm start

---

## Recommended Hosting

- Vercel
- Railway
- DigitalOcean
- VPS