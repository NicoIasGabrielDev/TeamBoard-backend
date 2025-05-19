# TeamBoard Backend

A RESTful API built with Node.js, Express and Prisma for managing football club training, games, and tactical events. This is the backend service for the TeamBoard system.

## 🌐 Live API

> https://teamboard-backend-1.onrender.com

---

## ⚙️ Tech Stack

- Node.js with TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- CORS

---

## 🔐 Features

- User registration and login with hashed passwords
- Role-based access control (`manager` and `player`)
- Team creation and user association
- Full CRUD for events (training, games, gym, meetings, etc)
- Middleware for JWT validation

---

## 🚀 Getting Started Locally

```bash
git clone https://github.com/your-username/teamboard-backend.git
cd teamboard-backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
