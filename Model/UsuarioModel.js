import mysql from 'mysql2/promise'


const confi = {
    host: 'localHost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'gestorTareas'
}

const conection = mysql.createConnection(confi)

export class usuarioModel{
    
    // static async getAll(){
    //     const data = (await conection).query('select docUser, nameUser from user')
    //     return
    // }

    static async verifySession({user,password}){
        const confirm = 0;
        const userff = await conection.query('CALL verifyUser(?,?)',[user,password])
        
            console.log("el holaaa")
            console.log(userff)
            return userff
    }




}