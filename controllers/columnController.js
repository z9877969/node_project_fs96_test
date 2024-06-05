import HttpError from '../helpers/HttpError.js';
import { Column } from '../model/tasksList.js';

export const addColumn = async (req, res, next) => {
  const { title } = req.body;
  const { boardId } = req.params;

  if (!title) {
    return res.status(400).send({ message: 'Title is required' });
  }

  const taskColumn = {
    title,
    boardId,
  };

  try {
    const newColumn = await Column.create(taskColumn);

    res.status(200).send(newColumn);
  } catch (error) {
    next(error);
  }
};

export const editColumn = async (req, res, next) => {
  const { id, boardId } = req.params;

  try {
    const result = await Column.findOneAndUpdate(
      {
        _id: id,
        boardId,
      },
      req.body,
      { new: true }
    );

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteColumn = async (req, res, next) => {
  const { id, boardId } = req.params;

  try {
    const column = await Column.findOneAndDelete({
      _id: id,
      boardId,
    });

    if (!column) {
      throw HttpError(404);
    }

    res.status(200).json(column);
  } catch (error) {
    next(error);
  }
};
