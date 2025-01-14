import mongoose from "mongoose";

async function connectDB() {
  console.log("Connecting to database...");
  if (!process.env.MONGO_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
}
export default connectDB;
