export class userController{
    constructor({usuarioModel}){
        this.usuarioModel = usuarioModel
    }

    verifySession = async(req,res)=>{
        try {
            const {user} = req.params;
            console.log(user)
            const {pass} = req.params;
            console.log(pass)
            const userfinally = await this.usuarioModel.verifySession({user},{pass})
            res.json(userfinally)
        } catch (error) {
            console.log('error: '+error)
        }
    }
}