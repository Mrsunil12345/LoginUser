const express =require("express");
const dotENV=require('dotenv')
const cookie=require('cookie-parser')
const app=express()
app.use(cookie())
dotENV.config()
const connectDB=require('./config/db')
connectDB()
const port=process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRoutes=require('./routes/userRoutes')



app.use('/api/users',userRoutes)


app.listen(port,()=>console.log("server is runing on......"+port))