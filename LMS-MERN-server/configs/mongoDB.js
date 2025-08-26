import mongoose from "mongoose";

let isConnected = false; 

export const connectDB = async () => {
  if (isConnected) return; // avoid reconnecting on every request

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(" MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
