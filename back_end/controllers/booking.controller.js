import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";

const bookPackage=AsyncHandler(async(req,res)=>{
    const {name,email,phoneNumber,numberOftravelers,specialRequests}=req.body
    if(!name){
        throw new ApiError(404,"name is required")
    }
    if(!email){
        throw new ApiError(404,"email is required")
    }
    if(!phoneNumber){
        throw new ApiError(404,"phoneNumber is required")
    }
    if(!numberOftravelers){
        throw new ApiError(404,"numberOftravelers is required")
    }
    if(!specialRequests){
        throw new ApiError(404,"specialRequests is required")
    }
    const booking=await Booking.create({
        name,
        email,
        phoneNumber,
        numberOftravelers,
        specialRequests
    })

    if(!booking){
        throw new ApiError(500,"package not booked")
    }
   return res
   .status(200)
   .json(new ApiResponse(200,booking,"package booking successfully"))
})

const allBookings=AsyncHandler(async(req,res)=>{
    const bookings=await Booking.find()
    console.log("bookings",bookings)
    if(!bookings){
        throw new ApiError(404,"booking not found in DB")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,bookings,"booking feched successfully"))
})

export {bookPackage,allBookings}
