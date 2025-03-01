import express from 'express';

import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDdataBase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';
import cors from "cors"
configDotenv()

const app = express();
const PORT = process.env.PORT || 4000

const allowedOrigins = [
  'https://subscription-tracker-rho.vercel.app/'
];


const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};



app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())  

// app.use(arcjetMiddleware)

app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware)


// Test route
app.get('/', (req, res) => {
  res.send("Hello, World!");
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDdataBase()

});




export default app;

