import { Post } from '../schemas/post';
import { Subcategory } from '../schemas/subcategory';
import { Sequence } from '../schemas/sequence';

export class PostModel {
  constructor(private post) {}

  create = async (postInfo) => {
    const sequence = await Sequence.findOneAndUpdate(
      {
        collectionName: 'posts',
      },
      { $inc: { value: 1 } },
      {
        upsert: true,
        returnDocument: 'after',
      },
    );

    const newPost = new Post(postInfo);
    console.log(sequence);
    newPost.id = sequence.value;
    await newPost.save();
    const result = await Subcategory.updateOne(
      { _id: postInfo.subcategoryId },
      { $inc: { postCount: 1 } },
    );
    return newPost;
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

  findByFilter = async (filter) => {
    return Post.find(filter);
  };

  update = async (postId, updateInfo) => {
    return Post.updateOne({ id: postId }, updateInfo);
  };
}

const postModel = new PostModel(Post);

export { postModel };
