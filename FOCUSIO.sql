DROP DATABASE IF EXISTS focusio;
CREATE DATABASE focusio;
USE focusio;
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20) DEFAULT 'medium',
    task_time TIME,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (
    title,
    description,
    due_date,
    priority,
    task_time,
    completed
)
VALUES (
    'Learn Backend',
    'Complete the Express CRUD tutorial',
    '2026-07-08',
    'high',
    '09:00:00',
    FALSE
);

DESCRIBE tasks;

SELECT
    id,
    title,
    description,
    due_date,
    priority,
    task_time,
    completed,
    created_at
FROM tasks;