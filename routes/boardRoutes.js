import express from 'express';
import {
  addBoard,
  deleteBoard,
  editBoard,
} from '../controllers/boardsControllers.js';

const boardRouter = express.Router();

boardRouter.post('/', addBoard);
boardRouter.put('/:id', editBoard);
boardRouter.delete('/:id', deleteBoard);

export default boardRouter;
