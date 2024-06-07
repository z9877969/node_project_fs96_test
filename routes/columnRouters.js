import express from 'express';
import {
  addColumn,
  deleteColumn,
  editColumn,
  getAllColumns,
  getOneColumn,
} from '../controllers/columnController.js';

const columnRouter = express.Router();

columnRouter.post('/', addColumn);
columnRouter.put('/:columnId', editColumn);
columnRouter.delete('/:columnId', deleteColumn);
columnRouter.get('/', getAllColumns);
columnRouter.get('/:columnId', getOneColumn);

export default columnRouter;
