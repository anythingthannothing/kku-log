const Joi = require("joi");

module.exports.postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.string(),
  subcategory: Joi.string().required(),
});

module.exports.postEditSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  subcategory: Joi.any(),
  tags: Joi.string().required(),
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().required(),
  }).required(),
});
