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

    static async postTask(input) {
        const postT = conection.query('insert into task (docUser, nameTask, descTask, stateTask, cateTask) values (?,?,?,?,?)', input.docUser, input.nameTask, input.descTask, input.stateTask, input.cateTask)
        if (postT) {
            console.log('hola')
            return true
        }
        return false

    }

}

