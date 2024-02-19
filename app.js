import express, {json} from  'express'
import {createUserRoutes} from './Routes/UserRoutes.js'
import { usuarioModel } from './Model/UsuarioModel.js';
import { corsMiddleware } from './Middleware/Cors.js';


const app = express();
app.use(json())
app.use(corsMiddleware())
app.use('/user',createUserRoutes({usuarioModel:usuarioModel}) )
const PORT  = process.env.PORT || 1234
app.disable('x-powered-by'); 

app.listen(PORT, ()=>{
    console.log('This application litening on the port http://localHost:'+PORT)
})