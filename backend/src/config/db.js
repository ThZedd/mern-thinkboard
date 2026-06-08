import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error Connecting to MongoDB", error);
        process.exit(1) // exit with failure
    }
}