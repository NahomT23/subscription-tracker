import express from 'express';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware ordering fix
app.use(express.json());
app.use(cookieParser());
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workflows', workflowRouter);

// Test route
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

// Error middleware should come AFTER routes
app.use(errorMiddleware);

// Vercel Serverless Function Setup
let isColdStart = true;

export default async (req, res) => {
    // Handle database connection on cold start
    if (isColdStart) {
        try {
            await connectToDatabase();
            isColdStart = false;
        } catch (error) {
            console.error('Failed to connect to database:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to connect to database'
            });
        }
    }
    
    // Forward request to Express
    return app(req, res);
};