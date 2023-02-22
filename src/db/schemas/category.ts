import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { collection: 'categories' },
);

const Category = model('categories', CategorySchema);

export { Category };
