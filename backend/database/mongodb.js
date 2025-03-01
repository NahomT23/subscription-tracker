import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const DB_URI = process.env.DATABASE_URI;

if (!DB_URI) {
    throw new Error('DATABASE_URI environment variable is required');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            serverSelectionTimeoutMS: 5000,  // Fail fast if no primary available
            socketTimeoutMS: 45000,          // Close sockets after 45s of inactivity
        });
        console.log("Connected to database successfully");
        return true;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;  // Propagate the error to the caller
    }
};

export default connectToDatabase;