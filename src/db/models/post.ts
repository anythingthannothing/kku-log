import { Post } from '../schemas/post';
import { AppError } from '../../app-error';
import { errorNames } from '../../error-names';
import { getNamespace } from 'cls-hooked';

export class PostModel {
  constructor(private post) {}

  create = async (postInfo) => {
    const session = getNamespace('session').get('transactionKey');
    try {
      const newPost = new Post({
        ...postInfo,
      });
      await newPost.save({ session });
      return newPost;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new AppError(errorNames.databaseError, 500, '트랜잭션 에러');
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
    return Post.findOne({ id: id });
  };

  update = async (postId, updateInfo) => {
    return Post.updateOne({ id: postId }, updateInfo);
  };
}

const postModel = new PostModel(Post);

export { postModel };
