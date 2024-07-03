/**Config Environment */
import dotenv from "dotenv";
dotenv.config();

/**Imports */
import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import authRouter from "./routes/routes";
import { connectDB } from "./config/db";
import { notFoundMiddleware } from "./middlewares/not-found";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import "express-async-errors";

/**Setup cors middleware */
const CORS_URL = process.env.CORS_URL;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL); // Replace '*' with the specific domains want to allow
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.sendStatus(204); // No Content for preflight requests
  } else {
    next(); // Continue processing other requests
  }
});

/**Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //jwt secret used to sign cookies
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is running....",
  });
});
app.use("/api/v1/", authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

/**Start the server */
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    connectDB(process.env.DATABASE_URL!);
    app.listen(PORT, () => console.log("Listening on port :", PORT));
  } catch (error) {
    console.error(error);
  }
};

start();
