const Joi = require("joi");

module.exports.postSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.string(),
    subcategory: Joi.string(),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().required(),
  }).required(),
});

module.exports.userSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).required(),
});

module.exports.subCategorySchema = Joi.object({
  subCategory: Joi.object({
    name: Joi.string().required(),
  }).required(),
});
