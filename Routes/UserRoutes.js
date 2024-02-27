import { Router } from "express";
import { userController } from "../Controller/UsuarioController.js";
import { TaskController } from "../Controller/TaskController.js";

export const createUserRoutes = ({ usuarioModel }) => {
    const userRoutes = Router()
    const UserController = new userController({ usuarioModel })

    userRoutes.get("/login/:user/:pass", UserController.verifySession)
    userRoutes.post('/register', UserController.registerUser)

    return userRoutes
}

export const createTaskRoutes = ({ TaskModel }) => {
    const taskRoutes = Router()
    const taskController = new TaskController({ TaskModel })

    taskRoutes.get("/get/:user", taskController.getTask)
    taskRoutes.post('/save', taskController.createTask)
    taskRoutes.get('/:user' ,taskController.findDoc)
    taskRoutes.get('/doc/:id', taskController.getTaskById)
    taskRoutes.get('/num/:num', taskController.findNumTask)
    taskRoutes.put('/update/:id', taskController.updateTask)
    return taskRoutes
}