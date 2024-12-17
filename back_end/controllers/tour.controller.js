import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Tour} from "../models/tour_package.model.js"

// create tourPackage ---ADMIN
const createTour=AsyncHandler(async(req,res)=>{
    const { title,description,price,availableDate,}=req.body
    if(!title){
        throw new ApiError(404,"tiltle is required!")
    }
    if(!description){
        throw new ApiError(404,"description is required!")
    }
    if(!price){
        throw new ApiError(404,"price is required!")
    }
    if(!availableDate){
        throw new ApiError(404,"availableDate is required!")
    }
    const isTourExist=await Tour.findOne({
        title
    })
    if(isTourExist){
        throw new ApiError(500,"TourPackage already exist")
    }
    const tour=await Tour.create({
        title,
        description,
        price,
        availableDate,
        image:req.file ? req.file.path: ''
    })
    if(!tour){
        throw new ApiError(500,"Tour not created!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,tour,"TourPackage created successfully"))

})

// Update tourPackage ---ADMIN
const updateTourPackage=AsyncHandler(async(req,res)=>{
    const tourId=req.params._id
    if(!tourId){
        throw new ApiError(404,"TourId not found!")
    }
    const {title,description,price,availableDate,}=req.body
    console.log("title",title)
    if(!title){
        throw new ApiError(404,"title is required!")
    }
    if(!description){
        throw new ApiError(404,"description is required!")
    }
    if(!price){
        throw new ApiError(404,"price is required!")
    }
    if(!availableDate){
        throw new ApiError(404,"availableDate is required!")
    }
    const updatedTour=await Tour.findByIdAndUpdate(tourId,{
        title,
        description,
        price,
        availableDate,
        image:req.file ? req.file.path : ""
    },{new:true})

    if(!updatedTour){
        throw new ApiError(500,"tour not updated")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,updatedTour,"tourPackage updated successfully"))
})

// delete tourPackage   ---ADMIN
const deleteTourPackage=AsyncHandler(async(req,res)=>{
    const tourId=req.params._id
    if(!tourId){
        throw new ApiError(404,"tour id required")
    }
    const deletedTour=await Tour.findByIdAndDelete(tourId)
    if(!deletedTour){
      throw new ApiError(500,"tourPackage not deleted")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{},"tourPackage deleted successfully"))
})

const tourDetails=AsyncHandler(async(req,res)=>{
    const tourId=req.body._id
    if(!tourId){
        throw new ApiError(404,"tour id is required")
    }
    const tour=await Tour.findById(tourId)
    if(!tour){
        throw new ApiError(500,"not fetched tour details!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,tour,"tour details fetched successfully"))

})

// get all tourPackages
const getAllTour=AsyncHandler(async(req,res)=>{
    const tour =await Tour.find()
    if(!tour){
        throw new ApiError("tour packages not found in data base")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,tour,"tours found successfully"))
})
export {
    createTour,
    updateTourPackage,
    deleteTourPackage,
    getAllTour,
    tourDetails
}