import Joi from 'joi';

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.string(),
  subcategory: Joi.string().required(),
  thumbnailUrl: Joi.string().uri().required(),
});

const postEditSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  subcategory: Joi.any(),
  tags: Joi.string().required(),
});

const commentSchema = Joi.object({
  body: Joi.string().required(),
});

export { postSchema, postEditSchema, commentSchema };
