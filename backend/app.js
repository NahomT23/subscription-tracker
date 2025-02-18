import express from 'express';

import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDdataBase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 4000



app.use(express.json());
app.use(cookieParser())  
app.use(errorMiddleware)


app.use('/api/v1/user', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/auth', authRouter);

// Test route
app.get('/', (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDdataBase()

});

export default app;
