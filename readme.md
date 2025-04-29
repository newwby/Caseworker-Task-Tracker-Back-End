# Task Tracker API Documentation

## Endpoints

### `GET /tasks`
- **Description**: Retrieve all tasks.
- **Response**:
  - `200 OK`: Returns a list of tasks.

### `GET /tasks/:id`
- **Description**: Retrieve a specific task by ID.
- **URL Parameters**:
  - `id` (integer): ID of the task.
- **Responses**:
  - `200 OK`: Returns task details.
  - `404 Not Found`: Task does not exist.

### `POST /tasks`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "due_date": "2025-04-27",
  }
  ```
- **Responses**:
  - `201 Created`: Task created successfully.
  - `400 Bad Request`: Invalid input data.

### `PUT /tasks/:id`
- **Description**: Update the status of a task.
- **URL Parameters**:
  - `id` (integer): ID of the task.
- **Request Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Responses**:
  - `200 OK`: Task status updated.
  - `404 Not Found`: Task does not exist.

### `DELETE /tasks/:id`
- **Description**: Delete a task by ID.
- **URL Parameters**:
  - `id` (integer): ID of the task.
- **Responses**:
  - `204 No Content`: Task successfully deleted.
  - `404 Not Found`: Task does not exist.

---

This project is intended to run locally and is not production ready.

# Setting up

### Install dependencies
_One line installation_
```
npm install express@4.21.2 pg@8.13.3 dotenv@16.4.7 cors@2.8.5
```

### Install postgreSQL and log in as the superuser. Create a 'caseworker' role and grant it database creation permission.

1. psql -U postgres
1. CREATE ROLE caseworker WITH LOGIN PASSWORD 'password';
1. ALTER USER caseworker CREATEDB;

**_As I'm sure you're aware - you should change that sample username, and that password is strongly discouraged._**

### Exit PostgreSQL from previous session, log in as 'caseworker' user & create the tasks database.

1. \q
1. psql -d postgres -U caseworker
1. CREATE DATABASE tasks;

### Run 'schema.sql' to create the tasks table and populate it with test data.
**Ensure your schema.sql contains the following**

```
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
```

### Log into the tasks database and execute the schema.sql file with the following command:
* psql -U caseworker -d tasks
* \i repo_path/db/schema.sql

**_Alternatively you can copy and paste the create table command and ignore the dummy data._**

### Set up your environment variables:
*Create a `.env` file and include the following:*

```
DB_USER=caseworker
DB_HOST=localhost
DB_DATABASE=tasks
DB_PASSWORD=password
DB_PORT=5432
```
