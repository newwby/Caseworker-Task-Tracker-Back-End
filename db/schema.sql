CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    due_date TIMESTAMP
);

INSERT INTO tasks (title, description, status, due_date)
    VALUES
    ('demo task', 'sample task for database testing', 'complete', '2025-04-28'),
    ('example task', 'you need example tasks', 'complete', '2025-04-28');