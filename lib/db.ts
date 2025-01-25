import mongoose from "mongoose";

let isConnected = false; // Tracks connection state

const connectDB = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    console.log("Using existing connection");
    return mongoose;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }

    // Connect to MongoDB
    const db = await mongoose.connect(uri);

    isConnected = true;
    console.log("Connected to MongoDB");

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
