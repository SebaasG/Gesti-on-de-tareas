export class userController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel
    }

    verifySession = async (req, res) => {
        try {
            const { user } = req.params;
            const { pass } = req.params;
            const userfinally = await this.usuarioModel.verifySession({ user }, { pass })
            if (userfinally === 2) {
                res.status(400).json('Usuario o contraseña incorrectos')
            } else
                res.status(302).json('Bienvenido '+user)

        } catch (error) {
            console.log('Error'+error)
        }
    }

    registerUser = async (req, res) => {
        try {
            const { doc } = req.params;
            const { user } = req.params;
            const { pass } = req.params;

            const newUser = await this.usuarioModel.registerUser({ doc }, { user }, { pass })
            console.log(newUser + "controller")
     
            if (newUser === 2) {
                res.status(404).json("el usuario ya existe")
            } else
                res.status(201).json('El usuario fue creado con éxito')

        } catch (error) {
            console.error('El nombre de usuario ya está en uso');
        }
    }

}