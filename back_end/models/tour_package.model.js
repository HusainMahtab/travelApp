import mongoose from "mongoose"

const tour_schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    availableDate:{
        type:Date,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Tour=mongoose.model("Tour",tour_schema)