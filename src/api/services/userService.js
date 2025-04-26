
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const fetchAllUsers = async () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        error.message = `Failed to get all users.`
        return reject(error)
      }
      else if (results == null) {
        return reject (new Error('getAllUsers output error.'))
      }
      else if (results.rows.length === 0) {
        return reject (new Error('getAllUsers - no users found.'))
      }
      else {
        resolve(results.rows)
      }
    });
  })
}


async function fetchUser(arg_id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = $1', [arg_id], (error, results) => {
      if (error) {
        error.message = `Failed to fetch user ${arg_id}.`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        resolve(null)
        // return reject (new Error(`User not found.`))
      }
      else {
        resolve(results.rows[0])
      }
    })
  })
}


async function insertUser(arg_name, arg_email) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [arg_name, arg_email], (error, results) => {
      // error handling
      let schema = {"name": arg_name, "email": arg_email}
      if (error) {
        error.message = `Failed to add user: ${schema}.`
        return reject(error)
      }
      else if (results.rows.length === 0) {
        return reject (new Error(`Did not return new user: ${schema}`))
      }
      else {
        resolve(results.rows[0])
      }

    })
  })
}


async function updateUser(arg_id, arg_name, arg_email) {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [arg_name, arg_email, arg_id],
    (error, results) => {
      if (error) {
        error.message = `Failed to modify user ${arg_id}.`
        return reject(error)
      }
      else {
        resolve(results.rows)
      }
    })
  })
}


async function deleteUser(arg_id) {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1', [arg_id], (error, results) => {
      if (error) {
        error.message = `Could not delete user ${arg_id}.`
        return reject(error)
      }
      else {
        resolve()
      }
    })
  })
}


module.exports = {
  fetchAllUsers,
  fetchUser,
  insertUser,
  updateUser,
  deleteUser,
}