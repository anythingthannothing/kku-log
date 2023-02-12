import { Schema, model, connection } from 'mongoose';
import { Comment } from './comment';

const PostSchema = new Schema(
  {
    subcategory: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comments',
      },
    ],
  },
  { collection: 'posts', timestamps: true },
);

PostSchema.pre('save', async function () {
  const sequenceCollection = connection.collection('sequences');

  const sequence = await sequenceCollection.findOneAndUpdate(
    {
      collectionName: 'posts',
    },
    { $inc: { value: 1 } },
    {
      upsert: true,
      returnDocument: 'after',
    },
  );

  const id = sequence.value.value;
  this.set({ id });
});

PostSchema.post('findOneAndDelete', async function (document) {
  await Comment.deleteMany({
    _id: {
      $in: document.comments,
    },
  });
});

const Post = model('posts', PostSchema);

export { Post };
