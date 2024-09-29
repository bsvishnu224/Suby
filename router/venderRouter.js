const venderController=require("../controller/venderController")
const express=require("express")

const router=express.Router()

router.post('/register',venderController.venderRegister)

module.exports= router