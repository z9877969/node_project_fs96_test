import express from 'express';
import {
  addColumn,
  deleteColumn,
  editColumn,
} from '../controllers/columnController.js';

const columnRouter = express.Router();

columnRouter.post('/', addColumn);
columnRouter.put('/:id', editColumn);
columnRouter.delete('/:id', deleteColumn);

export default columnRouter;
