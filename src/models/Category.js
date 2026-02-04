import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    level: {
      type: Number,
      index: true,
    },

    schemes: [
      {
        scheme: {
          type: String,
          trim: true,
        },
        headingText: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Auto level on save
CategorySchema.pre("save", function (next) {
  if (this.code) {
    this.level = this.code.length;
  }
  next();
});

// Auto level on updates
CategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update?.$set?.code) {
    update.$set.level = update.$set.code.length;
  }
  next();
});

// Prevent duplicate schemes per category
CategorySchema.index(
  { code: 1, "schemes.scheme": 1 },
  { unique: true, sparse: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
