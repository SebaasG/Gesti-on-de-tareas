import { Router } from "express";
import { userController } from "../Controller/UsuarioController.js";

export const createUserRoutes = ({usuarioModel})=>{
    const userRoutes = Router()

    const UserController = new userController({usuarioModel})

    userRoutes.get("/login/:user/:pass", UserController.verifySession)
    userRoutes.post('/register/:doc/:user/:pass', UserController.registerUser)
  
    return userRoutes
}