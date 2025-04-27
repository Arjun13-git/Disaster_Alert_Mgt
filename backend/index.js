import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app=express()
const port=process.env.PORT || 5000
import connectDB from "./config/db.js"
import authRouter from "./routes/route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
app.use(cors({
    origin: "https://frontend-dqbc.onrender.com",
    credentials: true
 }))
app.use(cookieParser())
app.use(express.json()) 
app.use("/",authRouter)

app.listen(port,()=>{
    connectDB()
    console.log("MongoDB connected")
    console.log(`Server is running on port ${port}`)
})

