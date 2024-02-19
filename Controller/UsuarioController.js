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
                res.status(200).json('bienvenido')

        } catch (error) {
            console.log('Error' + error)
        }
    }

    registerUser = async (req, res) => {
        try {

            const docUser = req.body.docUser;//Esto es para traer el valor real del objeto
            const nameUser = req.body.nameUser;
            const passUser = req.body.passUser;

            const newUser = await this.usuarioModel.registerUser(docUser, nameUser, passUser)
    
            if (newUser === 2) {
                res.status(404).json("El documento o el nombre de usuario ya está en uso")
            } else if(newUser){
                res.status(201).json('El usuario fue creado con éxito')
            }else{
                res.status(500).json('Error al crear su usuario')
            }
                

        } catch (error) {
            console.error('Error al crear el usuario, por favor intentelo más tarde'+error);
        }
    }

}