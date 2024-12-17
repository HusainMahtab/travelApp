import { Router } from "express";
import { authorizedUser,authorized_Role } from "../middlewares/verifyJWT.js";
import upload from "../middlewares/upload.middleware.js";
import { 
    signUp ,
    login,
    logout,
    profileDetails
} from "../controllers/user.controller.js";

const router=Router()

// register user
router.route("/signup").post(upload.single('profilePic'), (req, res, next) => {
    console.log('File:', req.file);  // Log file details
    console.log('Body:', req.body);  // Log body data
    next();  // Pass to the signUp controller
}, signUp);

// loggedIn user
router.route("/login").post(login)

// get profile details
router.route("/profile").get(authorizedUser,profileDetails)

// logOut user
router.route("/log_out").post(authorizedUser,logout)

export {router}