import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import connectDB from "./db/db_connection.js";
// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://travelapp-1-rvwg.onrender.com'], // No trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.options('*', cors());
// Connect to the database
connectDB().then(() => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App is running on PORT: ${port}`);
  });
}).catch(() => {
  console.log("DB not connected!");
});

// Middleware
app.use(express.json({ limit: "16mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(bodyParser.json({ limit: "16mb" }));

// Import user router
import { router } from "./routes/user.routes.js";
app.use("/api/v1/users", router);

// Import tour router
import tourTouter from "./routes/tour.routes.js"
app.use("/api/v1/tours",tourTouter)

// Import booking router
import bookingRoute from "./routes/booking.routes.js"
app.use("/api/v1/bookings",bookingRoute)
