export class TaskController {
    constructor({ TaskModel }) {
        this.TaskModel = TaskModel
    }


    getTask = async (req, res) => {
        const taks = await this.TaskModel.getTask();
        res.status(200).json(taks)
    }

    createTask = async (req, res) => {
        try {

            const result = req.body
            const postTask = await this.TaskModel.postTask(result.docUser, result.nameTask, result.descTask, result.stateTask, result.cateTask);
            res.status(201).json({ message: 'Se creo la tarea: ', data: result })
        } catch (error) {
            console.log(error)
        }
    }
}