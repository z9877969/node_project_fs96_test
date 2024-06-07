import HttpError from '../helpers/HttpError.js';
import { Board, Card, Column } from '../model/tasksList.js';

export const addBoard = async (req, res, next) => {
  const { name } = req.body;

  try {
    console.log(req);
    const board = {
      name,
      owner: req.user.id,
    };

    const newBoard = await Board.create(board);

    res.status(201).json(newBoard);
  } catch (error) {
    next(error);
  }
};

export const getAllBoards = async (req, res, next) => {
  const owner = req.user.id;

  if (!owner) {
    throw HttpError(404);
  }

  try {
    const allBoards = await Board.find({ owner }).populate('columns');

    if (!allBoards) {
      throw HttpError(404);
    }

    res.status(200).send(allBoards);
  } catch (error) {
    next(error);
  }
};

export const getOneBoard = async (req, res, next) => {
  const { boardId } = req.params;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      throw HttpError(404);
    }

    const columns = await Column.find({ boardId });

    const boardWithColumns = {
      ...board.toObject(),
      columns,
    };

    res.status(200).send({ board: boardWithColumns });
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

    const columns = await Column.find({ boardId: id });
    const columnIds = columns.map((column) => column._id);

    await Column.deleteMany({ boardId: id });
    await Card.deleteMany({ columnId: { $in: columnIds } });

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};
