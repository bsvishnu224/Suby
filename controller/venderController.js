

const Vender=require('../models/Vender')

const firm=require('../models/Firm')

const dotEnv=require('dotenv')

dotEnv.config()




const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

const key=process.env.myname



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

        console.log(newVender)

        
        
        res.status(200).json({message:"vender registerd successfully"})
        

    }catch(error){
        res.status(500).json({error:"internal server error"})
        console.error(error)
    }

}

const venderLogin= async (req,res)=>{
    const {email,password}=req.body
    try{
        const isVenderRegistered=await Vender.findOne({email})
        if (!isVenderRegistered || !await bcrypt.compare(password,isVenderRegistered.password)){
            res.status(400).json("Invalid Username or Password")
        }
        console.log(isVenderRegistered._id)
        console.log(key)
        const token=jwt.sign({venderId:isVenderRegistered._id},key)
        

        
        
        res.status(200).json({success:"login successful",token})

    }catch(error){
        res.status(500).json({error:"internal server error"})

    }
}

const getAllVenders= async (req,res)=>{
    try {
        const vender= await Vender.find().populate("firm");
        res.json({vender})
    } catch (error) {
        console.error(error)
        res.status(500).json({Error:"internal server error"})
    }
}

const getVenderById= async (req,res)=>{
    const venderId=req.params.id;
    try {
        const vender= await Vender.findById(venderId)
        if (!vender){
            res.status(404).json({error:"vender not found"})
        }
        res.status(200).json({vender})
    } catch (error) {
        console.error(error)
        res.status(500).json({Error:"internal server error"})
    }
}




module.exports={venderLogin,venderRegister,getAllVenders,getVenderById}