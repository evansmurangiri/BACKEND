import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        // HARDCODED connection string for testing
        const connectionString = 'mongodb+srv://evans:%40Putin14157%23@cluster0.llwzekq.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(connectionString)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}

export default connectDB;