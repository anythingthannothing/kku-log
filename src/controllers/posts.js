const Post = require('../db/schemas/post');
const Category = require('../db/schemas/category');
const { cloudinary } = require('../config/cloudinary');

exports.index = async (req, res, next) => {
  const categories = await Category.find({});
  if (req.query.filter) {
    const filter = req.query.filter.replace(/%20/g, ' ');
    const posts = await Post.find({ subcategory: filter });
    return res.render('index', { posts, categories });
  }
  const posts = await Post.find({});
  res.render('index', { posts, categories });
};

exports.new = async (req, res) => {
  const categories = await Category.find({});
  res.render('posts/new', { categories });
};

exports.create = async (req, res) => {
  const { title, content, tags, subcategory } = req.body;
  const targetSubcategory = await Category.subcategories.findOne({
    name: subcategory,
  });
  const post = new Post({
    subcategory: targetSubcategory.name,
    title,
    content,
    tags,
  });
  post.thumbnail = { url: req.file.path, filename: req.file.filename };
  targetSubcategory.posts.push(post);
  await targetSubcategory.save();
  await post.save();
  req.flash('success', '포스트 등록 완료!');
  return res.status(201).json(post._id);
};

exports.show = async (req, res) => {
  const { id } = req.params;
  const categories = await Category.find({});
  const post = await Post.findById(id).populate({
    path: 'comments',
    populate: {
      path: 'author',
    },
  });
  if (!post) {
    req.flash('error', '포스트를 찾을 수 없습니다 :(');
    return res.redirect('/posts');
  }
  res.render('posts/show', { categories, post });
};

exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const subcategories = await Subcategory.find({});
  const post = await Post.findById(id);
  if (!post) {
    req.flash('error', '포스트를 찾을 수 없습니다 :(');
    return res.redirect('/posts');
  }
  res.render('posts/edit', { post, subcategories });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    { ...req.body },
    { runValidators: true },
  );
  if (req.body.subcategory) {
    const newSub = await Subcategory.findOne({ name: req.body.subcategory });
    newSub.posts.push(post._id);
    await newSub.save();
    const { subcategory } = post;
    await Subcategory.findOneAndUpdate(
      { name: subcategory },
      { $pull: { posts: post._id } },
    );
  }

  if (req.file) {
    await cloudinary.uploader.destroy(post.thumbnail.filename);
    post.thumbnail = { url: req.file.path, filename: req.file.filename };
  }
  await post.save();
  req.flash('success', '포스트 수정 완료!');
  res.sendStatus(200);
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  await Subcategory.findOneAndUpdate(
    { name: post.subcategory },
    { $pull: { posts: post._id } },
  );
  await Post.findByIdAndDelete(id);
  req.flash('success', '포스트 삭제 완료!');
  return res.sendStatus(200);
};
