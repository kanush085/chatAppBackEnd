const jwt=require('jsonwebtoken')
module.exports={
    generateToken(payload){
        const token=jwt.sign({payload},'secretkey',{expiresIn:1440})
        const obj={
            success:true,
            message:"Token genearted successfully",
            token:token
        }
        return obj;
    }
}