import mysql from 'mysql2/promise'

const confi = {
    host: localHost,
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'gestorTareas'
}

const conection = mysql.createConnection(confi)

export class usuarioModel{
    





}