

const Vender=require('../models/Vender')


const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")



const venderRegister= async (req,res)=>{
    const {username,email,password}=req.body
    try{
        const venderEmail= await Vender.findOne({email})
        
        if (venderEmail){
            return res.status(400).json("Email already taken")
            
        }
        const hashedPassword= await bcrypt.hash(password,10) ;
        const newVender= new Vender({
            username,
            email,
            password:hashedPassword
        });
        await newVender.save()

        
        
        res.status(200).json({message:"vender registerd successfully"})
        

    }catch(error){
        res.status(500).json({error:"internal server error"})
        console.error(error)
    }

}





module.exports={venderRegister}