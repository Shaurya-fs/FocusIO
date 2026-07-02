# 🚀 FocusIO

FocusIO is a full stack task management web application developed as part of my Software Engineering project. The application helps users organize their daily tasks through a simple and user friendly dashboard. It follows a client server architecture with a React frontend, an Express backend, and a MySQL database.

The long term goal of the project is to develop an AI powered productivity application with intelligent task scheduling and calendar integration. The current version focuses on building a reliable software foundation with complete CRUD functionality.

---

## ✨ Features

- Create new tasks
- View all tasks
- Update task completion status
- Delete tasks
- Persistent task storage using MySQL
- REST API built with Express
- React based responsive user interface
- Component based frontend architecture

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### Database
- MySQL
- MySQL Workbench

### Testing
- Postman
- Manual Integration Testing

---

## 📂 Project Structure

```
FocusIO
│
├── frontend
│   ├── src
│   ├── Components
│   ├── Pages
│   └── Assets
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shaurya-fs/FocusIO.git
```

---

### 2. Install frontend dependencies

```bash
cd FocusIO
npm install
```

---

### 3. Install backend dependencies

```bash
cd backend
npm install
```

---

### 4. Create a `.env` file

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=focusio
DB_PORT=3306
```

---

### 5. Create the database

```sql
CREATE DATABASE focusio;

USE focusio;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);
```

---

### 6. Start the backend

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5001
```

---

### 7. Start the frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

---

## 📸 Current Application

The current version includes:

- Login Page
- Task Dashboard
- Add Task
- Task Details
- Calendar Panel
- Full CRUD Operations
- MySQL Integration

---

## 🚧 Future Improvements

The next development phase will focus on:

- User Authentication
- AI-powered Scheduling Assistant
- Intelligent Task Prioritization
- Google Calendar Integration
- Notifications and Reminders
- Analytics Dashboard
- Mobile Responsive Improvements

---

## 🎯 Project Status

**Current Version:** Phase 2

Completed:

- React Frontend
- Express Backend
- MySQL Integration
- CRUD Functionality
- REST API
- Full Frontend–Backend Integration

Upcoming (Phase 3):

- AI Features
- Authentication
- Calendar Synchronization
- Productivity Analytics

---

## 👨‍💻 Author

**Shaurya Arora**

Master's Student in Computer Science

Software Engineering Project – FocusIO

GitHub: https://github.com/Shaurya-fs

---

## 📄 License

This project was developed for academic purposes as part of a Software Engineering course.
