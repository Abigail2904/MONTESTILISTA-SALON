//Importanciones
const todosRouter = require("express").Router();
const User = require('../models/user');
const Todo = require('../models/todo');


//Obtener todas las tareas del usuario (GET /api/todos)
todosRouter.get('/', async (request, response) => {
    const user = request.user;
    const todos = await Todo.find({ user: user.id });
    return response.status(200).json(todos);
});


//Crear una nueva tarea (POST /api/todos
todosRouter.post('/', async (request, response) => {
    const user = request.user;
    const { text } = request.body;
    const newTodo = new Todo ({
        text,
        checked: false,
        user: user._id
    })
    const savedTodo = await newTodo.save();
    user.todos = user.todos.concat(savedTodo._id);
    await user.save();

    return response.status(201).json(savedTodo);
});


//Eliminar una tarea (DELETE /api/todos/:id)
todosRouter.delete('/:id', async (request, response) => {
    const user = request.user;
    
    await Todo.findByIdAndDelete(request.params.id)

    user.todos = user.todos.filter(todo => todo.id !== request.params.id);

    await user.save();
    return response.sendStatus(204);
});


//Actualizar el estado de una tarea (PATCH /api/todos/:id)
todosRouter.patch('/:id', async (request, response) => {
    const user = request.user;
    
    const { checked } = request.body;
    console.log(request.params.id);

    await Todo.findByIdAndUpdate(request.params.id, { checked });

    return response.sendStatus(200);
});



module.exports = todosRouter;

