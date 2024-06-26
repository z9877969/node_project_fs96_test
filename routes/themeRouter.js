import express from 'express';
import { auth } from '../middlewares/authenticate.js';
import { changeTheme } from '../controllers/themeControllers.js';

const themeRouter = express.Router();

themeRouter.post('/theme', auth, changeTheme);

export default themeRouter;
