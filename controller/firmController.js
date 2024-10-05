const Firm=require('../models/Firm');

const Vender=require('../models/Vender')
const multer=require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filename
    }
});

const upload = multer({ storage });

const addFirm= async (req,res)=>{
   try {
    const {firmName,area,region,category,offer}=req.body
    const image= req.file?req.file.filename:undefined;
    
    console.log(req.venderId)
    const vender= await Vender.findById(req.venderId)
    console.log(vender)

    if (!vender){
        res.status(404).json({messege:"vender not Found"})
    }

    const firm=new Firm({
        firmName,area,category,region,offer,image,vender:vender._id
    })
    const savedFirm=await firm.save()

    vender.firm.push(savedFirm)
    await vender.save()

    res.status(200).json({messege:"firm added successfully"})

    
   } catch (error) {
    console.error(error)
    res.status(500).json({messege:"internal server error"})
   }
}

const deleteFirmId= async(req,res)=>{
    try {
        const firmId=req.params.id;
        const deleteFirm= await Firm.findByIdAndDelete(firmId)
        if(!deleteFirm){
            res.status(400).json({error:"firm not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({messege:"internal server error"})
    }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmId}