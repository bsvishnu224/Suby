const express=require("express")

const productController=require("../controller/productController")

const router=express.Router()

router.post('/add-product/:id',productController.addProduct)
router.get('/:id/products',productController.getProductByFirm)

router.get('/uploads/:imagename',(req,res)=>{
    const ImageName=req.params.ImageName;
    res.headersSent('content-Type',"image/jpeg")
    res.sendFile(path.join(__dirname,"..","uploads",ImageName))
})

router.delete('/:id',productController.deleteProductById)

module.exports =router