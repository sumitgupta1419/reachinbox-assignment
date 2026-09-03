# ReachInbox.ai - Email Scheduler

A full-stack email scheduling application built as part of the ReachInbox.ai Software Development Intern assignment.

The application allows users to compose and schedule emails, process scheduled jobs using BullMQ and Redis, send emails through Ethereal SMTP, and track scheduled/sent email status.

---

## 🚀 Features

### Email Scheduling
- Schedule emails for a future date and time
- Subject and email body support
- Multiple recipient support
- Configurable delay between emails
- Configurable hourly sending limit
- Email status tracking

### Queue & Worker
- BullMQ for persistent job scheduling
- Redis/Memurai for queue storage
- Configurable worker concurrency
- Delayed jobs for scheduled emails
- Worker-based email processing
- Job completion and failure handling

### Email Delivery
- Ethereal SMTP for testing email delivery
- Ethereal preview URL for sent emails
- Email success/failure tracking

### Dashboard
- Scheduled emails view
- Sent emails view
- Queue status
- Email count
- Compose email interface
- Basic settings interface
- Responsive React UI

### Backend
- REST API using Express.js
- TypeScript backend
- PostgreSQL database
- Redis/BullMQ queue
- Health check endpoint

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- BullMQ
- Redis
- PostgreSQL
- Nodemailer

### Email
- Ethereal SMTP

### Development Tools
- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ Project Structure

```text
reachinbox-assignment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── workers/
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── .gitignore
└── README.md
