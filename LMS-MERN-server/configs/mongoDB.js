import mongoose from "mongoose";

// Use Mongoose's built-in connection state for a more robust check.
// A value of 1 means the connection is established.
const isConnected = () => mongoose.connection.readyState === 1;

export const connectDB = async () => {
  // If already connected, no need to do anything.
  if (isConnected()) {
    console.log("=> using existing database connection");
    return;
  }

  // Check for the MONGODB_URI before attempting to connect.
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env file");
  }

  try {
    console.log("=> using new database connection");
    await mongoose.connect(process.env.MONGODB_URI);
    // No need to manually set a flag; Mongoose handles the state internally.
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Propagate the error to let the calling function know something went wrong.
    throw new Error("Failed to connect to the database");
  }
};