const taskService = require('../src/api/services/taskService');
const taskController = require('../src/api/controllers/taskController');
const httpMocks = require('node-mocks-http');

// for testing 
jest.mock('../src/api/services/taskService');

// tests that don't require taskService to be mocked
describe("Controller Unit Test Suite", () => {

    test("GetAllTasks", async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        res.json = jest.fn()
        res.status = jest.fn().mockReturnValue(res);

        user_data = await taskController.getAllTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});

// tests below are from restful api template and need adjustments made to function
// as such they are temporarily disabled

// unit tests with taskService mocked
describe('getTaskById Tests', () => {

    // each test uses the same components
    let req, res;
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
    });

    // success test
    test('should return task data when task exists', async () => {
        const mockTask = {
            id: 1,
            title: 'Sample task',
            description: 'Example task for mock',
            status: 'Solved',
            due_date: '2025-04-28'
        };
        taskService.fetchTask.mockResolvedValue(mockTask);
        req.id = 1;
        await taskController.getTaskById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: mockTask });
    });

    // need integration test with middleware checking for task id (need to test 404 response)
    // error test
    test('should return 500 if taskService throws an error', async () => {
        taskService.fetchTask.mockRejectedValue(new Error('Database connection failed'));
        req.id = 1;
        await taskController.getTaskById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Database connection failed',
            status: 500
        });
    });
});


// unit tests broken into test suites for each function
describe('createTask Tests', () => {
    
    // each test uses the same components
    let req, res;
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
        req.body = {
            "id": 1,
            "title": 'Sample task',
            "description": 'Example task for mock',
            "status": 'Solved',
            "due_date": '2025-04-28'
        };
    });

    // success test
    test('should return confirmation of new task when created', async () => {
        const mockCreatedTask = {
            id: 1,
            title: 'Sample task',
            description: 'Example task for mock',
            status: 'Solved',
            due_date: '2025-04-28'
        };
        taskService.insertTask.mockResolvedValue(mockCreatedTask)
        await taskController.createTask(req, res);
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({"data": mockCreatedTask})
    });

    // failure test
    test('should return error message if new task not created', async () => {
        const mockErrorOutput = {
            "title": req.body.title,
            "description": req.body.description,
            "status": req.body.status,
            "due_date": req.body.due_date,
        }
        const mockError = new Error(`Failed to add task: ${mockErrorOutput}`)
        taskService.insertTask.mockRejectedValue(mockError)
        await taskController.createTask(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: mockError.message,
            status: 500
        });
    });
})

/*
// unit tests broken into test suites for each function
describe('changeTaskStatus Tests', () => {
    
    // each test uses the same components
    let req, res;
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
        req.id = 2;
        req.body.email = "task@ymail.com";
        req.body.name = "Brand New User";
    });

    // changeTaskStatus success test
    test('should return new task values if update successful', async () => {
        const mockUpdatedUser = {"id": req.id, "name": req.body.name, "email": req.body.email}
        taskService.createTask.mockResolvedValue(mockUpdatedUser)
        await taskController.updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({"data": mockUpdatedUser})
    })

    // changeTaskStatus failure test
    test('should return error message if update fails', async () => {
        const mockError = new Error(`Did not return task!`)
        taskService.createTask.mockRejectedValue(mockError)
        await taskController.createTask(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            error: mockError.message,
            status: 500
        });
    });

})

describe('removeTask Tests', () => {
    
// each test uses the same components
let req, res;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    req.id = 3;
});

// removeTask success test
test('should return no content status', async () => {
    taskService.deleteUser.mockResolvedValue()
    await taskController.removeTask(req, res);
    expect(res.status).toHaveBeenCalledWith(204)
})

// removeTask failure test
test('should return error message if update fails', async () => {
    const mockError = new Error(`Could not delete task!`)
    taskService.deleteUser.mockRejectedValue(mockError)
    await taskController.removeTask(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
        error: mockError.message,
        status: 500
    });
});

})
*/