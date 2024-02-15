import express from 'express'
import {createUserRoutes} from './Routes/UserRoutes.js'
import { usuarioModel } from './Model/UsuarioModel.js';

const app = express();

app.use('/user',createUserRoutes({usuarioModel:usuarioModel}) )

const PORT  = process.env.PORT || 1234

app.listen(PORT, ()=>{
    console.log('This application litening on the port http://localHost:'+PORT)
})