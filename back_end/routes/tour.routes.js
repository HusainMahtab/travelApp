import { Router } from "express";
import { authorizedUser,authorized_Role } from "../middlewares/verifyJWT.js";
import {
    createTour,
    updateTourPackage,
    deleteTourPackage,
    getAllTour,
    tourDetails
} from "../controllers/tour.controller.js"
import upload from "../middlewares/upload.middleware.js";
const router=Router()

// create tourPackage --- ADMIN
router.route("/create_tour").post(authorizedUser,authorized_Role("ADMIN"),upload.single("image"),(req,res,next)=>{
    console.log('File:', req.file); 
    console.log('Body:', req.body);  
    next();  
},createTour)

// update tourPackage ---ADMIN
router.route("/update_tour_package/:_id").put(
    authorizedUser,
    authorized_Role("ADMIN"),
    upload.single("image"), // Add this line to handle file uploads
    (req, res, next) => {
      console.log("File:", req.file); // Log uploaded file
      console.log("Body:", req.body); // Log form fields
      next(); // Proceed to the controller
    },
    updateTourPackage
  );

// delete tour package
router.route("/delete_tour_package/:_id").delete(authorizedUser,authorized_Role("ADMIN"),deleteTourPackage)

// all tour package ---users
router.route("/all_tours").get(getAllTour)

// fetch tour details
router.route("/tour_details").post(tourDetails)

export default router