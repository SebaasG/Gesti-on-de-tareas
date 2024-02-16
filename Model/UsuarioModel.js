import mysql from 'mysql2/promise'
import crypto from 'crypto';
import { never } from 'zod';

const confi = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'gestorTareas'
}

const conection = await mysql.createConnection(confi)

export class usuarioModel {
    static async verifySession({ user }, { pass }) {
        try {
            const passhash = await this.encrypt({pass})
            const [rows] = await conection.execute('CALL verifyUser(?, ?)', [user, passhash]);
            const result = rows[0][0].result;
            if (result === 1) {
                console.log("Bienvenido "+ user);
            } else {
                console.log("El usuario no existe.");
            }
        } catch (error) {
            console.error("Error en la consulta:", error);
            return null;
        }
    }

    static async encrypt({pass}){
        const hash = crypto.createHash('sha3-256'); // 
        hash.update(pass); 
        return hash.digest('hex');
    }

    static async registerUser({doc},{user},{pass}){
        try {
            let message;
            const cyperpass = await this.encrypt({pass})
            console.log(cyperpass)
            const newUser = conection.query('Insert into user(docUser,nameUser,passUser) values (?,?,?)',[parseInt(doc),user,cyperpass] )
            if(newUser){
                return message = 'Creado con exito';
            }else{
                return message = 0;
            }
        } catch (error) {

        }
    }
}
