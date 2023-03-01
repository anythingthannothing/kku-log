import { Schema, model } from 'mongoose';
import { Comment } from './comment';

const PostSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    subcategoryId: {
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
  },
  { collection: 'posts', timestamps: true },
);

// PostSchema.post('findOneAndDelete', async function (document) {
//   await Comment.deleteMany({
//     _id: {
//       $in: document.comments,
//     },
//   });
// });

const Post = model('posts', PostSchema);

export { Post };
