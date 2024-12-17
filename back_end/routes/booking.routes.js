import {Router} from "express"
import { allBookings, bookPackage } from "../controllers/booking.controller.js"
const router=Router()

// booking package ---Users
router.route("/booking").post(bookPackage)

// all bookings ---ADMIN
router.route("/all_bookings").get(allBookings)

export default router
