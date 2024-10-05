const mongoose=require("mongoose")

const firmShema=new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        require:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ["south-indian", "north-indian", "chinese", "bakery"]
            }
        ]
    },
    offer:{
        type:String
    },
    Image:{
        type:String
    },
    vender:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vender"
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]

})

const Firm = mongoose.model("Firm",firmShema)

module.exports=Firm