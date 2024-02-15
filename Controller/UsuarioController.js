export class usuarioController{
    constructor({usuarioModel}){
        this.usuarioModel = usuarioModel
    }

    verifySession = async(req,res)=>{
        try {
            const {user} = req.query;
            const {pass} = req.query;
            const userfinally = await this.usuarioModel.verifySession({user},{pass})
            res.json(userfinally)
        } catch (error) {
            console.log('error: '+error)
        }
    }
}