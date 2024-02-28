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

    static async getTask(user) {
        try {
            const [task] = await conection.query('select BIN_TO_UUID(idTask) as id,numTask, docUser, nameTask, descTask, stateTask,cateTask, dateStart from task where docUser = ? ORDER BY numTask ASC;', [user])
            return task
        } catch (error) {
            console.log('Error al guardar la Tareas Mod')
        }
    }

    static async getByid(task) {
        try {
            const [search] = await conection.query('select BIN_TO_UUID(idTask), numTask, docUser, nameTask, descTask, stateTask,cateTask, dateStart from task where BIN_TO_UUID(idTask) = ?;', [task])
            return search
        } catch (error) {
            console.log("Error al traer a la tarea id")
        }
    }

    static async postTask(numTask, docUser, nameTask, descTask, stateTask, cateTask) {
        try {
            const postT = await conection.query('insert into task (numTask, docUser, nameTask, descTask, stateTask, cateTask) values (?,?,?,?,?,?)', [numTask,docUser, nameTask, descTask, stateTask, cateTask])
            if (postT) {
                return true
            }
            return false
        } catch (error) {
            console.log('Erro al intentar guardar su tarea'+error)
        }
    }

    static async getdoc(nameUser) {
        const [doc] = await conection.query("SELECT user.docUser FROM user WHERE user.nameUser = ? LIMIT 1;", [nameUser])
        return doc
    }

    static async getnumTask(docUser){
        const [num] = await conection.query('select max (numTask) as numTaskUser from task where docUser = ?;', [docUser])
        return num
    }

    static async updateTask(idTask, nameTask, descTask, stateTask, cateTask) {
        try {

            console.log(idTask, nameTask, descTask ,stateTask, cateTask)
            const put = await conection.execute('CALL UpdateTask(UUID_TO_BIN(?), ?, ?, ?, ?)', [idTask, nameTask, descTask, stateTask, cateTask]); 
            
            if (put[0].affectedRows > 0) { 
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async deleteTask(idTask){

        const dele = await conection.query('delete from task where BIN_TO_UUID(idTask)  = ? ', [idTask])
        if(dele){
            return true
        }
        return false
    }
    
    
}


