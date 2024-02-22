export class TaskController {
    constructor({ TaskModel }) {
        this.TaskModel = TaskModel
    }


getTask = async (req,res)=>{
    const taks = await this.TaskModel.getTask();
    res.status(200).json(taks)
}




}