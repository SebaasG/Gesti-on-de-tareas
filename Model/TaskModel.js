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



    static async getTask(docUser) {

        const [taks] = await conection.query('select numTask, docUser, nameTask, descTask, stateTask,cateTask, dateStart from task where docUser = ?;', [docUser])
        return taks
    }

    static async getByid(numTask) {
        const [search] = await conection.query('select numTask, docUser, nameTask, descTask, stateTask,cateTask, dateStart from task where task.numTask = ?;', [numTask])
        return search
    }

    static async postTask(docUser, nameTask, descTask, stateTask, cateTask) {

        const postT = await conection.query('insert into task ( docUser, nameTask, descTask, stateTask, cateTask) values (?,?,?,?,?)', [docUser, nameTask, descTask, stateTask, cateTask])
        if (postT) {
            return true
        }

        return false

    }

    static async getdoc(nameUser) {
        const [doc] = await conection.query("SELECT user.docUser FROM user WHERE user.nameUser = ? LIMIT 1;", [nameUser])

        return doc
    }


}

