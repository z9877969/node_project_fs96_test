import express from 'express';
import {
  userCurrent,
  userUpdate,
  userHelpRequest,
} from '../controllers/usersControllers.js';
import { auth } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const userRouter = express.Router();

userRouter.post('/help', auth, userHelpRequest);

userRouter.get('/current', auth, userCurrent);

userRouter.put('/update', auth, upload.single('avatar'), userUpdate);

export default userRouter;
