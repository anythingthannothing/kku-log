import { Post } from '../schemas/post';
import { Subcategory } from '../schemas/subcategory';
import { Sequence } from '../schemas/sequence';
import { AppError } from '../../app-error';
import mongoDb from '../../mongoDb';

export class PostModel {
  constructor(private post, private sequence) {}

  create = async (postInfo) => {
    const session = await mongoDb.getSession();
    try {
      const sequence = await this.sequence
        .findOneAndUpdate(
          { collectionName: 'posts' },
          { $inc: { value: 1 } },
          { upsert: true, returnDocument: 'after' },
        )
        .session(session);
      console.log(sequence);
      const newPost = new Post({
        ...postInfo,
        id: sequence.value,
      });
      await newPost.save({ session });
      await Subcategory.updateOne(
        { _id: postInfo.subcategoryId },
        { $inc: { postCount: 1 } },
      ).session(session);
      await session.commitTransaction();
      return newPost;
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      throw new AppError('', 500, '');
    } finally {
      await session.endSession();
    }
  };

  findByPage = async (page, subcategoryId?: string) => {
    console.log(subcategoryId);
    if (subcategoryId) {
      return Post.find({ subcategoryId })
        .skip((page - 1) * 5)
        .limit(5)
        .sort({ createdAt: -1 });
    }
    return Post.find()
      .skip((page - 1) * 5)
      .limit(5)
      .sort({ createdAt: -1 });
  };

  countAll = async (subcategoryId?: string) => {
    if (!subcategoryId) {
      return Post.find().countDocuments();
    }
    return Post.find({ subcategoryId }).countDocuments();
  };

  findById = async (id) => {
    const post = await Post.findOne({ id: id });
    // .cache({ key: id });
    return post;
  };

  update = async (postId, updateInfo) => {
    return Post.updateOne({ id: postId }, updateInfo);
  };
}

const postModel = new PostModel(Post, Sequence);

export { postModel };
