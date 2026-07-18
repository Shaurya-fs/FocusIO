# FocusIO

FocusIO is a full stack AI assisted productivity and task management web application developed as part of my Master's Software Engineering portfolio project. 
The application enables users to organise daily tasks, generate AI assisted schedules, and synchronise approved schedules with Google Calendar through 
a modern and intuitive web interface.

The project follows a modular client server architecture using React for the frontend, Express.js for the backend, MySQL for data persistence, 
and external APIs for AI generated scheduling and calendar integration.

---

## Features

### Task Management

- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- View expandable task details
- Store tasks persistently using MySQL

### AI Productivity Assistant

- Generate AI-assisted daily schedules
- Organise tasks based on user input
- Review generated schedules before exporting

### Calendar Integration

- Export approved schedules to Google Calendar
- Synchronise planned activities with an external calendar

### Software Engineering

- RESTful API architecture
- Modular frontend components
- Client-server communication using HTTP requests
- Responsive user interface
- Persistent database storage

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js

## Database

- MySQL
- MySQL Workbench

## APIs

- OpenAI API
- Google Calendar API

## Testing

- Postman
- Manual Integration Testing

---

# Project Structure

```
FocusIO
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   └── assets
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── database
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── package.json
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/Shaurya-fs/FocusIO.git
```

---

## 2. Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

---

## 3. Configure environment variables

Create a `.env` file inside the backend folder.

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=focusio
DB_PORT=3306

OPENAI_API_KEY=your_openai_api_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri
```

---

## 4. Create the database

```sql
CREATE DATABASE focusio;

USE focusio;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority ENUM('Low','Medium','High'),
    estimated_duration VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE
);
```

---

## 5. Start the backend

```bash
npm run dev
```

Backend:

```
http://localhost:5001
```

---

## 6. Start the frontend

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Retrieve all tasks |
| GET | /tasks/:id | Retrieve a single task |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |
| POST | /generateSchedule | Generate an AI schedule |
| POST | /calendar/export | Export schedule to Google Calendar |

---

# Application Overview

The current implementation includes:

- User-friendly dashboard
- Expandable task details
- Task creation and editing
- Task completion tracking
- AI schedule generation
- Google Calendar integration
- Full CRUD functionality
- MySQL database integration
- Responsive interface

---

# Future Improvements

Potential future enhancements include:

- User authentication and authorisation
- Multi-user support
- Collaborative task management
- AI personalisation based on user behaviour
- Recurring task automation
- Push notifications and reminders
- Offline functionality
- Docker deployment
- CI/CD pipeline
- Cloud hosting

---

# Project Status

**Current Version:** Phase 3 (Final Portfolio Version)

### Completed

- Full-stack React application
- Express.js REST API
- MySQL database integration
- Complete CRUD operations
- AI-assisted scheduling
- Google Calendar integration
- Modular software architecture
- Responsive frontend
- Frontend-backend integration

---

# Screenshots

Screenshots of the application are available in the project documentation and can also be viewed below.

*(Add screenshots here after uploading them to GitHub.)*

---

# Author

**Shaurya Arora**

Master's Student in Computer Science

Software Engineering Portfolio Project

GitHub: https://github.com/Shaurya-fs

---

# License

This project was developed for academic and portfolio purposes as part of a Master's Software Engineering course.
