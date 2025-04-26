const express = require('express')
const userMiddleware = require('./src/api/middleware/userMiddleware')
const userController = require('./src/api/controllers/userController')
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



app.get('/users', userController.getAllUsers)
app.get('/users/:id', userMiddleware.validateUserID, userMiddleware.validateUserExists, userController.getUserById)
app.post('/users', userMiddleware.validateUserSchema, userController.createUser)
app.put('/users/:id', userMiddleware.validateUserID, userMiddleware.validateUserExists, userMiddleware.validateUserSchema, userController.updateUser)
app.delete('/users/:id', userMiddleware.validateUserID, userMiddleware.validateUserExists, userController.removeUser)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app;