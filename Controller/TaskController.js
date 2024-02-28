export class TaskController {
    constructor({ TaskModel }) {
        this.TaskModel = TaskModel
    }

    getTask = async (req, res) => {
        try {
            const user = req.params.user
            const taks = await this.TaskModel.getTask(user);
            res.status(200).json(taks)
        } catch (error) {
            console.log(error)
        }

    }

    getTaskById = async (req, res) => {
        try {
            const task = req.params.id
            const search = await this.TaskModel.getByid(task);
            res.status(302).json(search)
        } catch (error) {
            console.log(error)
        }

    }

    createTask = async (req, res) => {
        try {
            const result = req.body
            const postTask = await this.TaskModel.postTask(result.numTask, result.docUser, result.nameTask, result.descTask, result.stateTask, result.cateTask);
            res.status(201).json({ message: 'Se creo la tarea: ', data: result })
        } catch (error) {
            console.log(error)
        }
    }

    updateTask = async (req, res) => {
        try {
            const result = req.body
            console.log(result.idTask,result.nameTask, result.descTask, result.stateTask, result.cateTask)
            const updateTask = await this.TaskModel.updateTask(result.idTask, result.nameTask, result.descTask, result.stateTask, result.cateTask);
            if (updateTask == true) {
                res.status(201).json({ message: 'Se actualizo: ', data: result })
            } else{
                console.log("mal ahí chacho te falta mente")
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    findDoc = async (req, res) => {
        try {
            const user = req.params.user;
            const data = await this.TaskModel.getdoc(user)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    findNumTask = async (req, res) => {
        try {
            const num = req.params.num;
            const data = await this.TaskModel.getnumTask(num)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    deleteTask = async (req,res) =>{
        try {
            const id = req.body
            const data = await this.TaskModel.deleteTask(id.idTask)
            if(data === true){
                res.status(200).json(data)
            }
            res.status(404).json('Te falta mente chachito :)')
        } catch (error) {
            
        }
    }

}