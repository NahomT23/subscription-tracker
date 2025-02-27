import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { getUser } from '../controllers/user.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.post('/sign-out', signOut)

// authRouter.get('/me', authorize, getUser);


export default authRouter;
