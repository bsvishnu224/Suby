const mongoose= require("mongoose")

const venderSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})



const Vender=mongoose.model("Vender",venderSchema)

const passwordSchema= new mongoose.Schema({
    password:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"Vender"
    }
})

const Password=mongoose.model("Password",passwordSchema)


module.exports=Vender,Password


