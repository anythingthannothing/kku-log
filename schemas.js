const Joi = require("joi");

module.exports.postSchema = Joi.object({
  post: Joi.object({
    category: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required().min(10),
    tags: Joi.string(),
  }).required(),
});
