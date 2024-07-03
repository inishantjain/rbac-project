import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Connected To Database"))
    .catch((err: any) => {
      console.error("DB connection failed: " + err);
      process.exit(1);
    });
};
