const taskService = require('../services/taskService')

const getAllTasks = async (request, response) => {
  try {
    const tasks = await taskService.fetchAllTasks()
    response.status(200).json({"data": tasks })
  }
  catch (error) {
    response.status(500).json({"error": error.message, "status": 500})
  }
}


const getTaskById = async (request, response) => {
    try {
      const task = await taskService.fetchTask(request.id)
      response.status(200).json({"data": task})
    }
    catch (error) {
      response.status(500).json({"error": error.message, "status": 500})
    }
}


const createTask = async (request, response) => {
  try {
    const { title, description, status, due_date } = request.body
    const task = await taskService.insertTask(title, description, status, due_date)
    response.status(201).json({"data": task})
    
  }
  catch (error) {
    response.status(500).json({"error": error.message, "status": 500})
  }
}


const changeTaskStatus = async (request, response) => {
    try {
      const { status } = request.body
      const task = await taskService.updateTaskStatus(request.id, status)
      response.status(200).json({"data": task})
    }
    catch (error) {
      response.status(500).json({"error": error.message, "status": 500})
    }
}


const removeTask = async (request, response) => {
    try {
      const _task = await taskService.deleteTask(request.id)
      response.status(204).send()
    }
    catch (error) {
      response.status(500).json({"error": error.message, "status": 500})
    }
}


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    changeTaskStatus,
    removeTask,
}