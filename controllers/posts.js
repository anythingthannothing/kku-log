const Post = require("../models/post");
const { cloudinary } = require("../cloudianry");

module.exports.index = async (req, res, next) => {
  const posts = await Post.find({});
  res.render(`index`, { posts });
};

module.exports.new = (req, res) => {
  res.render("posts/new");
};

module.exports.create = async (req, res, next) => {
  const post = new Post(req.body.post);
  post.thumbnail = { url: req.file.path, filename: req.file.filename };
  await post.save();
  console.log(post);
  req.flash("success", "포스트 등록 완료!");
  res.redirect(`/posts/${post._id}`);
};

module.exports.show = async (req, res, next) => {
  const { id } = req.params;
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
  res.render("posts/show", { post });
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
  await Post.findByIdAndDelete(id);
  req.flash("success", "포스트가 정상적으로 삭제되었습니다 :)");
  res.redirect("/posts");
};
