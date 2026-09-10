import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error ("MONGODB_URI is required");
    }

    const mongooseInstance = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
    });

    return mongooseInstance.connection;
};

export default connectDB;