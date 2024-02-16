import mysql from 'mysql2/promise'
import crypto from 'crypto';
import { OK, never } from 'zod';

const confi = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'gestorTareas'
}

const conection = await mysql.createConnection(confi)

export class usuarioModel {

    static async encrypt({ pass }) {
        const hash = crypto.createHash('sha3-256'); // 
        hash.update(pass);
        return hash.digest('hex');
    }

    static async verifySession({ user }, { pass }) {
        try {
            const passhash = await this.encrypt({ pass })
            const [rows] = await conection.execute('CALL verifyUser(?, ?)', [user, passhash]);
            const result = rows[0][0].result;
            if (result === 1) {
                return 1
            } else {
                return 2
            }
        } catch (error) {
            console.error("Error en la consulta:", error);
            return null;
        }
    }

    static async validateUser({ doc },{ user } ) {
        try {
            const [rows] = await conection.execute('CALL validateUser(?, ?)', [doc, user]);
            const ammya = rows[0][0].result;
            console.log(ammya)
            if (ammya === 1) {
                return 1
            } else {
                return 2
            }
        } catch (error) {
            console.log(""+error);
        }
    }

    static async registerUser({ doc }, { user }, { pass }) {
        try {
   
            const cyberpass = await this.encrypt({ pass })
            const verify = await this.validateUser({ doc }, { user })
            console.log(verify + 'verifycacion')
            if(verify === 2){
                conection.query('Insert into user(docUser,nameUser,passUser) values (?,?,?)', [parseInt(doc), user, cyberpass])
                return 1
            }else{
                console.log('f')
                return 2
            }
        } catch (error) {
            console.log('error al ejecutar el registro')
        }
    }
}
