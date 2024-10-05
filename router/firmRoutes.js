const express=require("express")
const verifyToken=require('../middlewares/verifyToken')

const firmController=require("../controller/firmController")


const router=express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm)

router.get('/uploads/:imagename',(req,res)=>{
    const ImageName=req.params.ImageName;
    res.headersSent('content-Type',"image/jpeg")
    res.sendFile(path.join(__dirname,"..","uploads",ImageName))
})

router.delete('/:id',firmController.deleteFirmId)

module.exports= router