# Task Manager – Full Stack App

A modern full-stack task manager built with **React + TypeScript** on the frontend and **NestJS** on the backend.  
Includes authentication, protected routes, and a glass-morphism UI.

---

## ✨ Features

- 🔐 Authentication (Signup / Login / Logout)
- 🧠 Token-based auth (JWT stored in localStorage)
- 🧾 Create, edit, complete, and delete tasks
- 📝 Task descriptions & inline editing
- 🔄 Persistent login (auto-auth on refresh)
- 🎨 Glassmorphism UI with MUI
- 🛡 Protected routes (auth guard behavior)
- ⚡ Responsive & modern design

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
- REST API
- JWT Authentication
- CORS enabled

---

## 📁 Project Structure (Frontend)

src/
├── auth/
│ ├── AuthContext.tsx
│ ├── AuthProvider.tsx
│ ├── auth.service.ts
│ └── useAuth.ts
├── tasks/
│ ├── tasks.service.ts
│ └── task.types.ts
├── pages/
│ ├── Login.tsx
│ ├── Signup.tsx
│ └── Tasks.tsx
└── main.tsx

---

## 🚀 Getting Started

### Frontend
```bash
npm install
npm run dev
```
### Backend
```bash
npm install
npm run start:dev
```
## Make sure the backend is running on:
```url
http://localhost:3000
```
---

## 🔐 Authentication Flow
- User logs in / signs up
- JWT token is stored in localStorage
- On app load, /me is called to restore session
- Unauthorized users are redirected to login
- Authenticated users are redirected to tasks

## 📸 UI 
- Glass cards
- Blurred background
- Glowing inputs & icons
- Clean dashboard layout

##🧠 What I Learned
- Managing auth state with React Context
- Handling protected routes cleanly
- Styling complex UI with MUI sx
- Integrating React with a NestJS backend
- Proper async state handling (loading / error)

---

##👤 Author
###Bishoy Labib

