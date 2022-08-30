const Joi = require("joi");

module.exports.postSchema = Joi.object({
  post: Joi.object({
    category: Joi.string(),
    title: Joi.string().required(),
    content: Joi.string().required().min(10),
    tags: Joi.string(),
  }).required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().required(),
  }).required(),
});

module.exports.userSchema = Joi.object({
  user: Joi.object({
    username: Joi.string().required(),
    id: Joi.string().required(),
    password: Joi.string().required(),
    passwordCheck: Joi.string().required(),
  }).required(),
});
