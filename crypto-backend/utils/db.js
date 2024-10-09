import mongoose from "mongoose";

//! function to connect to mongodb
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Failed to Connect to DB ", error.message);
    process.exit(1); //? Ending process
  }
};
