const express = require('express')
const mid = require('./src/api/middleware/taskMiddleware')
const con = require('./src/api/controllers/taskController')
const app = express()
const port = 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})



app.get('/tasks', con.getAllTasks)
app.get('/tasks/:id', mid.validateTaskID, mid.validateTaskExists, con.getTaskById)
app.post('/tasks', mid.validateTaskSchema, con.createTask)
app.put('/tasks/:id', mid.validateTaskID, mid.validateTaskExists, con.changeTaskStatus)
app.delete('/tasks/:id', mid.validateTaskID, mid.validateTaskExists, con.removeTask)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app;