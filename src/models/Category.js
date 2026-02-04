import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    scheme: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    headingText: {
      type: String,
      required: true,
      trim: true,
    },

    // derived from code.length
    level: {
      type: Number,
      index: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicates
CategorySchema.index({ scheme: 1, code: 1 }, { unique: true });

// Hooks are kept for NON-bulk operations only
CategorySchema.pre("save", function (next) {
  if (this.code) {
    this.level = this.code.length;
  }
  next();
});

export const Category =
  mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
