import express from 'express';
import {
  addColumn,
  deleteColumn,
  editColumn,
  getAllColumns,
  getOneColumn,
} from '../controllers/columnController.js';
import { auth } from '../middlewares/authenticate.js';

const columnRouter = express.Router();

columnRouter.post('/', auth, addColumn);
columnRouter.put('/:columnId', auth, editColumn);
columnRouter.delete('/:columnId', auth, deleteColumn);
columnRouter.get('/', auth, getAllColumns);
columnRouter.get('/:columnId', auth, getOneColumn);

export default columnRouter;
