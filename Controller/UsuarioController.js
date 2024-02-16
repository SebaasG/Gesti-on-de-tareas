export class userController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel
    }

    verifySession = async (req, res) => {
        try {
            const { user } = req.params;
            const { pass } = req.params;
            const userfinally = await this.usuarioModel.verifySession({ user }, { pass })
            res.json(userfinally)
        } catch (error) {
            console.log('error: ' + error)
        }
    }

    registerUser = async (req, res) => {
        try {
            const { doc } = req.params;
            console.log(doc)
            const { user } = req.params;
            console.log(user)
            const { pass } = req.params;
            console.log(doc)
            const newUser = await this.usuarioModel.registerUser({ doc }, { user }, { pass })
            res.json(newUser)
        } catch (error) {
            console.log('error' + error)
        }

    }
    encrypt = async (req,res) =>{
        try {
            const {pass} = req.params;
            const passhash = await this.usuarioModel.encrypt({pass})
            res.json(passhash)
        } catch (error) {
            
        }
    }
}