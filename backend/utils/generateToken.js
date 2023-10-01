const jwt=require('jsonwebtoken')

const generateToken=(res,userid)=>{
    const token=jwt.sign({userid},process.env.JWT_KEY,{
        expiresIn:'30d'
    })
    
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
    })
}

module.exports=generateToken