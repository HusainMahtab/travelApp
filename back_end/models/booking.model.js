import mongoose from "mongoose"

const bookingSchema=new mongoose.Schema({
    package:[
        {
          packageId:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Tour",
             required:true
           },
          packageTitle:{
             type:String,
           },
          image:[{
             type:String,
             ref:"Tour",
             required:true
           }], 
        }  
    ],
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    numberOftravelers:{
        type:Number,
        required:true
    },
    specialRequests:{
        type:String
    },
},{timestamps:true})

export const Booking=mongoose.model("Booking",bookingSchema)