import { User } from "../models/user.model.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"

// generate access token
const generateToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        if(!user){
            throw new ApiError(404,"userId not found!")
        }
        const accessToken=user.generateAccessToken()
        user.accessToken=accessToken
        await user.save({validateBeforeSave:false})
        return accessToken

    } catch (error) {
        console.error("error",error)
        throw new ApiError(500,"error while generating AccessToken")
    }
}

// sign up users
const signUp=AsyncHandler(async(req,res)=>{
    const {userName,email,password,phoneNumber,role}=req.body
    if(!userName){
        throw new ApiError(404,"userName not found!")
    }
    if(!email){
        throw new ApiError(404,"email not found!")
    }
    if(!password){
        throw new ApiError(404,"password not found!")
    }
    if(!phoneNumber){
        throw new ApiError(404,"phoneNumber not found!")
    }
    if(!role){
        throw new ApiError(404,"role not found!")
    }
    const isAlreadyExist=await User.findOne({email})
    if(isAlreadyExist){
        throw new ApiError(500,"user already exist")
    }

    const user=await User.create({
        userName,
        email,
        password,
        phoneNumber,
        role:role || "USER",
        profilePic:req.file ? req.file.path: ''
    })

    if(!user){
        throw new ApiError(500,"user not created!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,user,"user created successfully"))

})

// login users
const login=AsyncHandler(async(req,res)=>{
    const {email, phoneNumber,password}=req.body
    if(!(email || phoneNumber)){
        throw new ApiError(402,"email or phoneNumber are required")
    }
    if(!password){
        throw new ApiError(404,"password not find")
    }
    const user=await User.findOne({
        $or:[
            {email},
            {phoneNumber}
        ]
    })
    if(!user){
        throw new ApiError(403,"user not found in data base")
    }
    const isPasswordCorrect=await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(500,"Invalid email of password")
    }
    const accessToken=await generateToken(user._id)
    if(!accessToken){
        throw new ApiError(401,"token not generated")
    }
    const loggedInUser=await User.findById(user._id).select("-password")
    const options = {
        httpOnly: true,                   
        secure: process.env.NODE_ENV === 'production',  
        sameSite:'none'               
      };
    return res
    .status(200)
    .cookie("AccessToken",accessToken,{ ...options, maxAge: 604800000 })
    .json(new ApiResponse(200,{user:loggedInUser},"user login successfully"))
})

// get profile details
const profileDetails=AsyncHandler(async(req,res)=>{
    const userId=req?.user?._id
    if(!userId){
        throw new ApiError(404,"userId not found")
    }
    const user=await User.findById(userId)
    if(!user){
        throw new ApiError(404,"user not found in database!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,user,"profile details fetched successfully"))
})


// logOut user
const logout=AsyncHandler(async(req,res)=>{
    const currentUser=req.user
    if(!currentUser){
        throw new ApiError(500,"current user not found!")
    }
    currentUser.accessToken=null
    return res
    .status(200)
    .clearCookie('AccessToken', {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Secure cookie in production
        // sameSite: 'none', // Adjust SameSite policy if needed
    })
    .json(new ApiResponse(200,{},`${currentUser.role} logout successfully`))
})


export {
    signUp,
    login,
    logout,
    profileDetails
}