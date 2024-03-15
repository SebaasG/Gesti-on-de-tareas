import express, { json } from 'express';
import { createTaskRoutes } from './Routes/Routes.js';
import { createUserRoutes } from './Routes/Routes.js';
import { usuarioModel } from './Model/UsuarioModel.js';
import { corsMiddleware } from './Middleware/Cors.js';
import { TaskModel } from './Model/TaskModel.js';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);    
const app = express();
app.use(json());
app.use(corsMiddleware());
app.use('/View', express.static(path.join(__dirname, 'View')));
app.use('/user', createUserRoutes({ usuarioModel: usuarioModel }));
app.use('/task', createTaskRoutes({ TaskModel: TaskModel }));
const PORT = process.env.PORT || 1234;
app.disable('x-powered-by');

app.get('/login', (req, res) => {
    // Envía el archivo index.html ubicado en la carpeta public

   const  filePath = path.join(__dirname, './index.html');
    console.log(filePath)
    res.sendFile(filePath);
    
  });

// Ahora puedes usar __dirname como lo harías en un módulo de CommonJS


app.listen(PORT, () => {
    console.log('This application listening on the port http://localhost:' + PORT+'/login');
});
