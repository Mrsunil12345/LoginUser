const jwt =require('jsonwebtoken')
const user=require('../models/user')

const auth=async(req,res,next)=>{
    let token;
    token=req.cookies.access_token
    console.log(token)
    if(token){
        try {
            const decoded= jwt.verify(token,process.env.JWT_KEY)
            console.log(decoded)
            req.user=await user.findById(decoded.userid).select('-password')
            console.log(decoded,req.user)
            next()
            
        } catch (error) {
            res.status(400).send({message:"Invalid token"})
        }

    }else{
        res.status(400).send({message:"Something went worng"})
    }
}
module.exports=auth