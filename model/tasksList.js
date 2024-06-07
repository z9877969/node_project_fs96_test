import { Schema, model } from 'mongoose';

const boardSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
      required: [true, 'Set name for board'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
  },
  { timestamps: true, versionKey: false }
);

export const Board = model('Board', boardSchema);

const columnsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  },
  { timestamps: true, versionKey: false }
);

export const Column = model('Column', columnsSchema);

const cardsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      enum: ['without priority', 'low', 'medium', 'high'],
    },
    deadline: {
      type: Date,
    },
    columnId: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Card = model('Card', cardsSchema);
