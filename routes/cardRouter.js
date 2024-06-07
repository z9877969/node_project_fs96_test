import express from 'express';
import {
  addCard,
  deleteCard,
  editCard,
  getAllCards,
  getOneCard,
} from '../controllers/cardController.js';

const cardRouter = express.Router();

cardRouter.post('/', addCard);
cardRouter.put('/:cardId', editCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.get('/', getAllCards);
cardRouter.get('/:cardId', getOneCard);

export default cardRouter;
