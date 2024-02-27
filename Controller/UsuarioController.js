export class userController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel
    }

    verifySession = async (req, res) => {
        try {
            const user = req.params.user;
            const pass = req.params.pass;
            const userfinally = await this.usuarioModel.verifySession(user, pass)
            if (userfinally === 2) {
                res.status(400).json('Usuario o contraseña incorrectos')
            } else
                res.status(200).json('bienvenido')
        } catch (error) {
            console.log('Error' + error)
        }
    }

    registerUser = async (req, res) => {
        try {
            const { docUser, nameUser, passUser } = req.body;//Esto nos sirve para extraer solo el body de cada uno
            const newUser = await this.usuarioModel.registerUser(docUser, nameUser, passUser)
            this.handleUser(newUser, res)
        } catch (error) {
            res.status(500).json('Erro al crear el usuario')
        }
    }

    handleUser = async (newUser, res) => {
        if (newUser === 2) {
            res.status(404).json("El documento o el nombre de usuario ya está en uso")
        } else if (newUser === 1) {
            res.status(201).json('El usuario fue creado con éxito')
        } else {
            res.status(500).json('Error al crear su usuario')
        }
    }
}