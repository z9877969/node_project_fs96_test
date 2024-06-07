import express from 'express';
import {
  addBoard,
  deleteBoard,
  editBoard,
  getAllBoards,
  getOneBoard,
} from '../controllers/boardsControllers.js';
import { auth } from '../middlewares/authenticate.js';

const boardRouter = express.Router();

boardRouter.post('/', auth, addBoard);
boardRouter.put('/:boardId', auth, editBoard);
boardRouter.delete('/:boardId', auth, deleteBoard);
boardRouter.get('/', auth, getAllBoards);
boardRouter.get('/:boardId', auth, getOneBoard);

export default boardRouter;
