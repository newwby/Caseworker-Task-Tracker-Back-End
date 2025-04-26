const taskService = require('../services/taskService')

const validateTaskExists = async (request, response, next) => {
    try {
        const task = await taskService.fetchTask(request.id)
        if (!task) {
            return response.status(404).json({"error": "Task not found", "status": 404})
        }
        next()
    } catch (error) {
        response.status(500).json({"error": "Could not validate task.", "status": 500})
    }
}


// chain with validateTaskExists
const validateTaskID = async (request, response, next) => {
  const request_id = parseInt(request.params.id)
  if (isNaN(request_id)) {
    return response.status(400).json({"error": `Could not validate task id ${request_id}.`, "status": 400})
  }
  else {
    request.id = request_id
    next()
  }
}

const validateTaskSchema = async (request, response, next) => {
    const { title, description, status, due_date } = request.body
    if (!title || !description|| !status|| !due_date) {
        return response.status(400).json({ "error": "Missing required fields in request", "status": 400 })
    }
  next()
}

module.exports = {
    validateTaskExists,
    validateTaskID,
    validateTaskSchema,
}