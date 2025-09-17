import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async (req, res) => {
    try{
        await mongoose.connect(config.mongoUri)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}