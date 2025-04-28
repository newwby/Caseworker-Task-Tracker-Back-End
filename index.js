const express = require('express')
const cors = require('cors')
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

app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.get('/test', (req, res) => {
  res.json({ message: "CORS test successful" });
});

app.get('/', (request, response) => {
  response.json({ info: 'Task tracker endpoint documentation available at https://github.com/hmct-application-projects/task-tracker-backend' })
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