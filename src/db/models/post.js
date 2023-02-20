import { Post } from '../schemas/post';
import { Subcategory } from '../schemas/subcategory';
import { Sequence } from '../schemas/sequence';

class PostModel {
  static async create(postInfo) {
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
  }

  static async findByPage(page, subcategoryId) {
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
  }

  static async countAll(subcategoryId) {
    if (!subcategoryId) {
      return Post.find().countDocuments();
    }
    return Post.find({ subcategoryId }).countDocuments();
  }

  static async findById(id) {
    const post = await Post.findOne({ id: id });
    // .cache({ key: id });
    return post;
  }

  static async findByFilter(filter) {
    return Post.find(filter);
  }

  static async update(postId, updateInfo) {
    return Post.updateOne({ _id: postId }, updateInfo);
  }
}

export { PostModel };
