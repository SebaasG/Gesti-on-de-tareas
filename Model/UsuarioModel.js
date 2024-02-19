import mysql from 'mysql2/promise'
import crypto from 'crypto';

const confi = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'gestorTareas'
}

const conection = await mysql.createConnection(confi)

export class usuarioModel {

    static async encrypt( passUser ) {
        const hash = crypto.createHash('sha3-256'); // 
        hash.update(passUser);
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

    static async validateUser( docUser ,  nameUser ) {
        try {
            const [rows] = await conection.execute('CALL validateUser(?, ?)', [docUser, nameUser]);
            const ammya = rows[0][0].result;
            console.log(ammya)
            if (ammya === 1) {
                return 1
            } else {
                return 2
            }
        } catch (error) {
            console.log("" + error);
        }
    }

    static async registerUser(docUser, nameUser, passUser) {
        try {

            const cyberpass = await this.encrypt(passUser)

            const verify = await this.validateUser(docUser, nameUser)
           
            console.log(verify + 'verifycacion')
            console.log(docUser,nameUser,cyberpass)
            if (verify === 2) {
                conection.query('Insert into user(docUser,nameUser,passUser) values (?,?,?)', [docUser, nameUser, cyberpass])
                return 1
            } else {
                console.log('f')
                return 2
            }
        } catch (error) {
            console.log('error al ejecutar el registro' + error)
        }
    }
}
