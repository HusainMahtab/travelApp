import mongoose from "mongoose";

const connectDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_DB_URI)
       console.log("DB connected successfully")
    } catch (error) {
        console.error("db not connected!",error?.message)
    }
}

export default connectDB