const Firm = require('../models/Firm');
const  Product= require('../models/Product')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filename
    }
});

const upload = multer({ storage });

const addProduct= async (req, res)=>{
    try {
        const {productName,price,category,bestseller,description}=req.body
        const image=req.file?req.file.filename:undefined;
        const firmId=req.params.id;
        const firm= await Firm.findById(firmId);
        if (!firm){
            res.status(400).json({error:"no firm Found"})
        }
        const product= new Product({
            productName,price,category,description,bestseller,image,firm:firm._id
        })
        const savedProduct= await product.save()

        firm.products.push(savedProduct)
        await firm.save()

        res.status(200).json({success:"product added successfully"})



    } catch (error) {
        console.error(error)
        res.status(500).json({error:'internal server error'})
        
    }
}

const getProductByFirm= async (req,res)=>{
    try {
        const firmId=req.params.id
        const firm= await Firm.findById(firmId).populate("products")
        if (!firm){
            res.status(400).json({messege:"firm not found"})

        }
        const restaurantName= firm.firmName
        const product= await Product.find({firm:firmId})
        res.status(200).json({restaurantName,product})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'internal server error'})
    }
}

const deleteProductById= async (req,res)=>{
    try {
        const productId=req.params.id
        const deleteProduct= await Product.findByIdAndDelete(productId)
        if(!deleteProduct){
            res.status(400).json({error:"no product Found"})

        }


    } catch (error) {
        console.error(error)
        res.status(500).json({error:'internal server error'})
    }
}


module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}