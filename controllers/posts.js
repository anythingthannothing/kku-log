const Post = require("../models/Post");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const { cloudinary } = require("../cloudianry");

module.exports.index = async (req, res, next) => {
  const categories = await Category.find({}).populate({
    path: "subcategories",
  });
  if (req.query) {
    const { filter } = req;
    const posts = await Post.find({ subcategory: filter });
  }
  const posts = await Post.find({});
  console.log(categories);
  res.render("index", { posts, categories });
};

module.exports.new = async (req, res) => {
  const subcategories = await Subcategory.find({});
  res.render("posts/new", { subcategories });
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  const { title, content, tags } = req.body;
  const subcategory = await Subcategory.findOne({ name: req.body.subcategory });
  const post = new Post({
    subcategory: subcategory.name,
    title,
    content,
    tags,
  });
  post.thumbnail = { url: req.file.path, filename: req.file.filename };
  subcategory.posts.push(post);
  await subcategory.save();
  await post.save();
  req.flash("success", "포스트 등록 완료!");
  return res.redirect(`/posts/${post._id}`);
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const categories = await Category.find({}).populate("subcategories");
  const post = await Post.findById(id).populate({
    path: "comments",
    populate: {
      path: "author",
    },
  });
  if (!post) {
    req.flash("error", "포스트를 찾을 수 없습니다 :(");
    return res.redirect("/posts");
  }
  res.render("posts/show", { post, categories });
};

module.exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    req.flash("error", "포스트를 찾을 수 없습니다 :(");
    return res.redirect("/posts");
  }
  res.render("posts/edit", { post });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body.post, {
    new: true,
    runValidators: true,
  });
  console.log(post);
  await cloudinary.uploader.destroy(post.thumbnail.filename);
  post.thumbnail = { url: req.file.path, filename: req.file.filename };
  await post.save();
  req.flash("success", "포스트 수정 완료!");
  res.redirect(`/posts/${id}`);
};

module.exports.remove = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  await Subcategory.findOneAndUpdate(
    { name: post.subcategory },
    { $pull: { posts: post._id } }
  );
  await Post.findByIdAndDelete(id);
  await req.flash("success", "포스트가 정상적으로 삭제되었습니다 :)");
  res.redirect("/posts");
};
