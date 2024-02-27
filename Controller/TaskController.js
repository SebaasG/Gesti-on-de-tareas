export class TaskController {
    constructor({ TaskModel }) {
        this.TaskModel = TaskModel
    }

    getTask = async (req, res) => {
        const result = req.params.user
        const taks = await this.TaskModel.getTask(result);
        res.status(200).json(taks)
    }

    getTaskById = async (req, res) => {
        const result = req.params.id
        const search = await this.TaskModel.getByid(result);
        res.status(302).json(search)
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

    findDoc = async (req, res) => {
        try {
            const user = req.params.user;
            const data = await this.TaskModel.getdoc(user)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    updateTask = async (req, res) => {
        try {
            const result = req.body
        } catch (error) {
        }
    }
}