# HambakTech Coding Standards

## General Rules

- Use TypeScript for all application code.
- Keep components small and reusable.
- Avoid duplicate code.
- Follow the DRY (Don't Repeat Yourself) principle.
- Use meaningful file and variable names.
- Prefer composition over duplication.

---

## Folder Structure

src/
├── actions/
├── app/
├── components/
├── lib/
├── services/
├── types/

---

## Components

Every page should include:

- Loading state
- Error handling
- Empty state
- Responsive design

---

## Database

- Use Prisma ORM.
- Use UUIDs for primary keys.
- Add indexes where appropriate.
- Avoid hardcoded values that belong in the database.

---

## Git

Every completed feature must follow:

1. Build
2. Test
3. Fix
4. Commit
5. Push
6. Document

---

## Documentation

Every milestone must be documented before it is marked complete.