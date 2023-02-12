import { PostService, CategoryService } from '../services';

const createPost = async (req, res, next) => {
  const postInfo = { ...req.body };
  const newPost = await PostService.createPost(postInfo);
  req.flash('success', '포스트 등록 완료!');
  return res.status(201).json(newPost._id);
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const post = await PostService.findByIdAndUpdate(
    id,
    { ...req.body },
    { runValidators: true },
  );
  if (req.body.subcategory) {
    const newSub = await CategoryService.findOne({
      name: req.body.subcategory,
    });
    newSub.posts.push(post._id);
    await newSub.save();
    const { subcategory } = post;
    await CategoryService.findOneAndUpdate(
      { name: subcategory },
      { $pull: { posts: post._id } },
    );
  }

  await post.save();
  req.flash('success', '포스트 수정 완료!');
  res.sendStatus(200);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const post = await PostService.findById(id);
  await CategoryService.findOneAndUpdate(
    { name: post.subcategory },
    { $pull: { posts: post._id } },
  );
  await PostService.findByIdAndDelete(id);
  req.flash('success', '포스트 삭제 완료!');
  return res.sendStatus(200);
};

export { createPost, updatePost, deletePost };
