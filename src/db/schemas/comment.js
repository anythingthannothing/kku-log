import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    body: {
      type: String,
      required: true,
    },
  },
  { collection: 'comments', timestamps: true },
);

const Comment = model('comments', CommentSchema);

export { Comment };
