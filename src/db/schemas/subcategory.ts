import { Schema, model } from 'mongoose';

const SubcategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  { collection: 'subcategories' },
);

const Subcategory = model('subcategories', SubcategorySchema);

export { Subcategory };
