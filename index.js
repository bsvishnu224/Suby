const express= require("express");
const dotEnv=require("dotenv")
const mongoose=require("mongoose")
const venderRoutes=require('./router/venderRouter')
const firmRoute=require('./router/firmRoutes')
const productRoute=require('./router/productRoutes')
const bodyParser=require("body-parser")
const  app =express()
const path=require("path")

dotEnv.config()

const PORT=4000;



console.log(process.env.mongo_URI)

mongoose.connect(process.env.mongo_URI)
.then(()=>console.log("MongooDb connected successfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json())
app.use('/vender',venderRoutes)
app.use('/firm',firmRoute)
app.use('/product',productRoute)
app.use('/uploads',express.static("uploads"))



app.listen(PORT,()=>{
    console.log("server started and running and 4000")
})


app.use('/home',(req,res)=>{
    res.send("<h1> Welcone to suby")
})