import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    comments: [
      {
        type: [Schema.Types.ObjectId],
        ref: 'Comment',
        default: [],
      },
    ],
  },
  { collection: 'users', timestamps: true },
);

const User = model('users', UserSchema);

export { User };
