import Joi from 'joi';

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.string(),
  subcategoryId: Joi.string().required(),
  thumbnailUrl: Joi.string().uri().required(),
});

const postEditSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  subcategoryId: Joi.any(),
  tags: Joi.string().required(),
  thumbnailUrl: Joi.string().uri(),
});

const commentSchema = Joi.object({
  body: Joi.string().required(),
});

export { postSchema, postEditSchema, commentSchema };
