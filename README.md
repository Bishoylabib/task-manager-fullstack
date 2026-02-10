# Yomicepa - Task Manager - Full Stack App

A modern full-stack task manager built with **React + TypeScript** on the frontend and **NestJS + Prisma** on the backend.  
Includes authentication, protected routes, and a glass-morphism UI.

---

## ✨ Features

### Frontend
- 🔐 Authentication (Signup / Login / Logout)
- 🧾 Create, edit, complete, and delete tasks
- 📝 Task descriptions & inline editing
- ⚡ Responsive layout
- 🎨 Glass-inspired UI with MUI

### Backend
- NestJS REST API
- JWT Authentication
- Users and Tasks modules
- Prisma ORM with SQLite (or Postgres/MySQL)
- CORS enabled
- Basic validation via DTOs (Data Transfer Objects)

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Material UI (MUI)
- React Router
- Axios

### Backend
- NestJS
- TypeScript
- Prisma ORM
- REST API
- JWT Authentication
- Mysql
---

## 📁 Project Structure (Backend)
```
backend/task-mgr-backend
├─ .prettierrc
├─ eslint.config.mjs
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20260208132505_init
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ prisma.config.ts
├─ README.md
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.controller.spec.ts
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.spec.ts
│  │  ├─ auth.service.ts
│  │  ├─ dto
│  │  │  ├─ login.dto.ts
│  │  │  └─ signup.dto.ts
│  │  └─ jwt.strategy.ts
│  ├─ generated
│  ├─ main.ts
│  ├─ prisma
│  │  └─ prisma.module.ts
│  ├─ prisma.service.ts
│  ├─ tasks
│  │  ├─ dto
│  │  │  ├─ create-task.dto.ts
│  │  │  └─ update-task.dto.ts
│  │  ├─ tasks.controller.spec.ts
│  │  ├─ tasks.controller.ts
│  │  ├─ tasks.module.ts
│  │  ├─ tasks.service.spec.ts
│  │  └─ tasks.service.ts
│  └─ users
│     ├─ users.controller.spec.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     ├─ users.service.spec.ts
│     └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json
```
### Backend Highlights
- Auth Module 
  - Signup & login endpoints
  - Password hashing & JWT issuance
  - JWT authentication via AuthGuard('jwt')
  - Protected routes enforced
  - JWT strategy implemented with passport-jwt
    
- Tasks Module 
  - Full CRUD operations: create, read, update, delete
  - Tasks are user-specific and ownership enforced
  - Input validation via DTOs (class-validator)
  - Proper error handling: 404 for missing, 403 for forbidden
    
- Users Module 
  - Manage user endpoints
  - Safe user objects returned (no passwords)
    
- Database 
  - Prisma ORM with MariaDB
  - Models: User & Task
  - Relations: Task.userId
  - .env used for sensitive info (JWT_SECRET, DB credentials)
    
- Testing & API 
  - Basic API testing with Postman
  - CRUD endpoints and JWT-protected routes validated
  - Passwords not exposed
    
- API Documentation 
  - Swagger documentation implemented for all endpoints


## 📁 Project Structure (Frontend)

```
frontend/task-manager-frontend
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  └─ axios.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ auth
│  │  ├─ auth.api.ts
│  │  ├─ auth.service.ts
│  │  ├─ auth.types.ts
│  │  ├─ AuthContext.tsx
│  │  ├─ AuthProvider.tsx
│  │  └─ useAuth.ts
│  ├─ context
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ AuthLoader.tsx
│  │  ├─ Login.tsx
│  │  ├─ Signup.tsx
│  │  └─ Tasks.tsx
│  ├─ routes
│  │  └─ ProtectedRoute.tsx
│  ├─ tasks
│  │  ├─ task.types.ts
│  │  ├─ tasks.api.ts
│  │  └─ tasks.service.ts
│  └─ users
│     ├─ users.api.ts
│     └─ users.service.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
### Frontend Highlights

- Authentication Flow
  - Signup, Login, Logout fully implemented
  - JWT token stored in localStorage and used for API calls
  - Persistent login on page refresh (auto-auth using token)
  - Protected routes via React Router and useAuth
    
- Tasks Management UI
  - Create, edit, delete, complete tasks
  - Inline editing of task titles and descriptions
  - User-specific tasks fetched from backend
  - Proper handling of loading/error states

- UI / Design
  - Glassmorphism cards with blurred background
  - Glowing inputs & buttons
  - Modern, clean dashboard layout
  - Icons for actions (edit, delete, complete)

- State Management
  - Auth state managed via React Context (AuthProvider, useAuth)
  - Tasks state managed with local useState and updated via API calls
  - Async updates with Axios and proper error handling

- Code Practices
  - TypeScript interfaces/types for tasks and auth objects
  - Axios wrapper (tasks.api.ts / auth.api.ts) for API calls
  - Modular file structure: auth/, tasks/, pages/

- Optional / Nice Touches
  - Loading spinners or disabled buttons during API calls
  - MUI’s sx prop used for custom styling instead of plain CSS
    
---

## 🚀 Getting Started

### Frontend
```bash
npm install
npm run dev
```
### Frontend will run on:
```url
http://localhost:5173
```
### Backend
```bash
npm install
npm run start:dev
```
### Backend will run on:
```url
http://localhost:3000
```
### API Documentation (Swagger UI)
```url
http://localhost:3000/api
```
#### Note
The backend allows requests from the frontend URL (http://localhost:5173) via CORS

---

## 🔮 Future Improvements / Next Steps

### Frontend
- Add dark mode toggle for better UX
- Implement drag & drop tasks ordering
- Add notifications / alerts for task updates
- Use React Query or Redux Toolkit for more robust state management
- Add unit & integration tests for components

### Backend
- Implement JWT refresh tokens for extended sessions
- Enforce response consistency via DTOs for all endpoints
- Add rate limiting & security headers
- Extend task filtering / sorting endpoints
- Add end-to-end tests for API routes

### API Documentation
- Keep Swagger UI updated for any new endpoints
- Optionally add Postman collection for easier testing

---

## 👤 Author
### Bishoy Labib

