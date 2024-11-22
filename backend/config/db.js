import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.Db_URL}/imagify`);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("error connecting to databse:", err.message);
    process.exit(1);
  }
};

export default connectDB;
