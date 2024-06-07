import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { createUserSchema, loginUserSchema } from '../schemas/userSchemas.js';
import {
  SignIn,
  SignUp,
  LogOut,
  refreshToken,
} from '../controllers/authControllers.js';
import { refreshAuth } from '../middlewares/refreshAuth.js';
import { auth } from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(createUserSchema), SignUp);

authRouter.post('/login', validateBody(loginUserSchema), SignIn);

authRouter.get('/refresh', refreshAuth, refreshToken);

authRouter.post('/logout', auth, LogOut);

authRouter.get('/refresh', refreshAuth, refreshToken);

export default authRouter;
