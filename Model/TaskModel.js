import mysql from 'mysql2/promise'



export const confi = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'gestorTareas'
}

const conection = await mysql.createConnection(confi)

export class TaskModel {

    static async getTask() {
        const [taks] = await conection.query('select * from task')
        return taks
    }

    static async postTask(docUser,nameTask,descTask,stateTask,cateTask) {

      
        const postT = conection.query('insert into task (docUser, nameTask, descTask, stateTask, cateTask) values (?,?,?,?,?)',[ docUser, nameTask, descTask, stateTask, cateTask])
        if (postT) {
         
            return true
        }
        console.log('a no papi')
        return false

    }

    static async getById(nameUser){
        const doc = await conection.query("SELECT user.docUser FROM task INNER JOIN user ON task.docUser = user.docUser WHERE user.nameUser = ? LIMIT 1;",[nameUser])
        console.log(doc)
        return [doc]
    }
    

}

