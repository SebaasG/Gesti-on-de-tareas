import express, { json } from 'express';
import { createTaskRoutes } from './Routes/Routes.js';
import { createUserRoutes } from './Routes/Routes.js';
import { usuarioModel } from './Model/UsuarioModel.js';
import { corsMiddleware } from './Middleware/Cors.js';
import { TaskModel } from './Model/TaskModel.js';
import path from 'path'; // Importa el módulo path

const app = express();
app.use(json());
app.use(corsMiddleware());
app.use('/user', createUserRoutes({ usuarioModel: usuarioModel }));
app.use('/task', createTaskRoutes({ TaskModel: TaskModel }));
const PORT = process.env.PORT || 1234;
app.disable('x-powered-by');

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
    console.log('This application listening on the port http://localhost:' + PORT);
});
