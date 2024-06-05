import HttpError from '../helpers/HttpError.js';
import { Board } from '../model/tasksList.js';

export const addBoard = async (req, res, next) => {
  const { name } = req.body;

  try {
    const board = {
      name,
      owner: req.user.id,
    };

    const newBoard = await Board.create(board);

    res.status(200).json(newBoard);
  } catch (error) {
    next(error);
  }
};

export const editBoard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Board.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
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

export const deleteBoard = async (req, res, next) => {
  const { id } = req.params;

  try {
    const board = await Board.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!board) {
      throw HttpError(404);
    }
    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};
