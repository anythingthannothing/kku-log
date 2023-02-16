import { Schema, model } from 'mongoose';

const SequenceSchema = new Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'sequences' },
);

const Sequence = model('sequences', SequenceSchema);

export { Sequence };
