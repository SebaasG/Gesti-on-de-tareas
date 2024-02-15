import mysql from 'mysql2/promise'
import { Connection } from 'mysql2/typings/mysql/lib/Connection'

const confi = {
    host: localHost,
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
        const user = (await conection).query('CALL verifyUser(?,?)',[user,password])
        if (user===0){
            console.log("el usuario no existe")
            confirm = 0
        }
        else{
            console.log('Bienvenido')
            confirm=1;
        }
    }




}