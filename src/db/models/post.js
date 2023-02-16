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

  static async findAll() {
    return Post.find().limit(5).sort({ createdAt: -1 });
  }

  static async findById(id) {
    const post = await Post.findOne({ id: id });
    // .cache({ key: id });
    return post;
  }

  static async update(postId, updateInfo) {
    return Post.updateOne({ _id: postId }, updateInfo);
  }
}

export { PostModel };
