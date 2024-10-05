const Vender= require('../models/Vender')
const jwt=require("jsonwebtoken")

const dotEnv=require("dotenv")

dotEnv.config()

const key=process.env.myname

const verifyToken= async (req,res,next)=>{
    const token=req.headers.token
    console.log(token)
    if (!token){
        res.status(401).json({error:"token is required"})
    }
    try {
        const decode=jwt.verify(token,key)
        console.log(decode)

        const vender= await Vender.findById(decode.venderId)
        console.log(vender)

        if(!vender){
            res.status(404).json({error:"vender not Found"})
        }
        
        req.venderId=vender._id
        console.log(req.venderId)

        next()

    } catch (error) {
        res.status(500).json({error:"Invalid token"})
        
    }
}

module.exports=verifyToken