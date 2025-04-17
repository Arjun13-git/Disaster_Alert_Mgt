import mongoose from "mongoose" 
import dotenv from "dotenv"
dotenv.config()
const mongoURI=process.env.MONGO_URL
const connectDB=async()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB connection failed",error)
     
    }
}
export default connectDB