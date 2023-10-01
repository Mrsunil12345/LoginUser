const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        const con= mongoose.connect(process.env.MONGO_URL)
        if(con){
            console.log("mongoDb connected....")
        }
        
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
    
}
module.exports=connectDB