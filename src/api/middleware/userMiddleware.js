const userService = require('../services/userService')

const validateUserExists = async (request, response, next) => {
    try {
        const user = await userService.fetchUser(request.id)
        if (!user) {
            return response.status(404).json({"error": "User not found", "status": 404})
        }
        next()
    } catch (error) {
        response.status(500).json({"error": "Could not validate user.", "status": 500})
    }
}


const validateUserID = async (request, response, next) => {
  const request_id = parseInt(request.params.id)
  if (isNaN(request_id)) {
    response.status(400).json({"error": `Could not validate user id ${request_id}.`, "status": 400})
  }
  else {
    request.id = request_id
    next()
  }
}

const validateUserSchema = async (request, response, next) => {
    const { name, email } = request.body
    if (!name || !email) {
        return response.status(400).json({ "error": "Missing required fields: name and email", "status": 400 })
    }
  next()
}

module.exports = {
    validateUserExists,
    validateUserID,
    validateUserSchema,
}