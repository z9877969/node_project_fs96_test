import { Card } from '../model/tasksList';

export const addCard = async (req, res, next) => {
  try {
    const cardInfo = {
      title: req.body,
      description: req.body,
      priority: 'without priority',
      deadline: null,
      columnId: req.params,
    };

    const newCard = await Card.create(cardInfo);

    res.status(200).send(newCard);
  } catch (error) {
    next(error);
  }
};
