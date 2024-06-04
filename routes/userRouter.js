import express from 'express';
import { userCurrent, userUpdate } from '../controllers/usersControllers.js';
import { auth } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const userRouter = express.Router();

userRouter.get('/current', auth, userCurrent);

userRouter.put('/update', auth, upload.single('avatar'), userUpdate);

export default userRouter;
