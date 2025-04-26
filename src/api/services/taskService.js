
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


async function fetchAllTasks() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
      if (error) {
        error.message = `Failed to get all tasks.`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        return reject (new Error('fetchAllTasks - no users found.'))
      }
      else {
        resolve(results.rows)
      }
    });
  })
}


async function fetchTask(arg_id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM tasks WHERE id = $1', [arg_id], (error, results) => {
      if (error) {
        error.message = `Failed to fetch task ${arg_id}.`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        resolve(null)
      }
      else {
        resolve(results.rows[0])
      }
    })
  })
}


async function insertTask(task_title, task_desc, task_status, task_due) {
  return new Promise((resolve, reject) => {
    pool.query(`
      INSERT INTO tasks (title, description, status, due_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [task_title, task_desc, task_status, task_due],
      (error, results) =>
    {
      // error handling
      let schema = {
        "name": task_title,
        "description": task_desc,
        "status": task_status,
        "due_date": task_due,
      }
      if (error) {
        error.message = `Failed to add task: ${JSON.stringify(schema)}.`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        return reject (new Error(`Did not return new task: ${JSON.stringify(schema)}`))
      }
      else {
        resolve(results.rows[0])
      }
    })
  })
}


async function updateTaskStatus(task_id, task_status) {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
    [task_status, task_id],
    (error, results) => {
      if (error) {
        error.message = `Failed to modify task ${task_id}.`
        return reject(error)
      }
      else {
        resolve(results.rows[0])
      }
    })
  })
}


async function deleteTask(task_id) {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM tasks WHERE id = $1', [task_id], (error, results) => {
      if (error) {
        error.message = `Could not delete task ${task_id}.`
        return reject(error)
      }
      else {
        resolve()
      }
    })
  })
}


module.exports = {
  fetchAllTasks,
  fetchTask,
  insertTask,
  updateTaskStatus,
  deleteTask,
}