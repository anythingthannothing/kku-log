import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'categories' },
);

const Category = model('categories', CategorySchema);

export { Category };
