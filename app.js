import express from 'express'
import {createUserRoutes} from './Routes/UserRoutes.js'
import { usuarioModel } from './Model/UsuarioModel.js';
import { corsMiddleware } from './Middleware/Cors.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware())
app.use('/user',createUserRoutes({usuarioModel:usuarioModel}) )
const PORT  = process.env.PORT || 1234
app.disable('x-powered-by'); 

app.listen(PORT, ()=>{
    console.log('This application litening on the port http://localHost:'+PORT)
})