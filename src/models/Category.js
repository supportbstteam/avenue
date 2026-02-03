import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    scheme: { type: String, required: true },
    code: { type: String, required: true },
    headingText: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent duplicates
CategorySchema.index({ scheme: 1, code: 1 }, { unique: true });

export const Category =
  mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
