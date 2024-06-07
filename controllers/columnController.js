import HttpError from '../helpers/HttpError.js';
import { Card, Column } from '../model/tasksList.js';

export const addColumn = async (req, res, next) => {
  const { title, boardId } = req.body;
  if (!title) {
    return res.status(400).send({ message: 'Title is required' });
  }

  const taskColumn = {
    title,
    boardId,
  };

  try {
    const newColumn = await Column.create(taskColumn);

    res.status(201).send(newColumn);
  } catch (error) {
    next(error);
  }
};

export const getAllColumns = async (req, res, next) => {
  const { boardId } = req.body;

  try {
    if (!boardId) {
      throw HttpError(400);
    }

    const allColumns = await Column.find({ boardId }).populate('cards');

    if (!allColumns) {
      throw HttpError(404);
    }

    res.status(200).send(allColumns);
  } catch (error) {
    next(error);
  }
};

export const getOneColumn = async (req, res, next) => {
  const { columnId } = req.params;

  if (!columnId) {
    throw HttpError(404);
  }

  try {
    const column = await Column.findById(columnId);

    if (!column) {
      throw HttpError(404);
    }

    const cards = await Card.find({ columnId });

    const columnWithCards = {
      ...column.toObject(),
      cards: cards,
    };

    res.status(200).send({ column: columnWithCards });
  } catch (error) {
    next(error);
  }
};

export const editColumn = async (req, res, next) => {
  const { id } = req.params;
  const { boardId } = req.body;

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
  const { id } = req.params;
  const { boardId } = req.body;

  try {
    const column = await Column.findOneAndDelete({
      _id: id,
      boardId,
    });

    if (!column) {
      throw HttpError(404);
    }

    await Card.deleteMany({ columnId: id });

    res.status(200).json(column);
  } catch (error) {
    next(error);
  }
};
