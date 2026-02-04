import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
          required: true,
          trim: true,
        },

        headingText: {
          type: String,
          trim: true,
        },

        status: {
          type: Boolean,
          default: true, // ✅ scheme-level status
          index: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Auto level on save
CategorySchema.pre("save", function () {
  if (this.code) {
    this.level = this.code.length;
  }
});

// Auto level on update
CategorySchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  if (update?.$set?.code) {
    update.$set.level = update.$set.code.length;
  }
});

// Prevent duplicate scheme per category
CategorySchema.index(
  { code: 1, "schemes.scheme": 1 },
  { unique: true }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
