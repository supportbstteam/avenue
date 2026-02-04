import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category");

    /**
     * ==================================================
     * CASE 1: ROOT (no category)
     * ==================================================
     */
    if (!categoryParam) {
      const categories = await Category.find({ level: 1 })
        .sort({ code: 1 })
        .lean();

      const books = await Book.find({
        categories: { $exists: true, $ne: [] },
      })
        .limit(20)
        .populate("categories")
        .lean();

      return Response.json({
        type: "ROOT",
        categories,
        books,
      });
    }

    /**
     * ==================================================
     * CASE 2: CATEGORY CLICKED
     * ==================================================
     */
    let category;

    if (mongoose.Types.ObjectId.isValid(categoryParam)) {
      category = await Category.findById(categoryParam).lean();
    } else {
      category = await Category.findOne({
        code: categoryParam.trim(),
      }).lean();
    }

    if (!category) {
      return Response.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    /**
     * -------------------------
     * IMMEDIATE SUBCATEGORIES
     * -------------------------
     * Example:
     * Parent = A
     * Children = AB, AC (length = A.length + 1)
     */
    const subCategories = await Category.find({
      code: {
        $regex: `^${category.code}`,
      },
      level: category.level + 1,
    })
      .sort({ code: 1 })
      .lean();

    /**
     * -------------------------
     * DESCENDANTS (for books)
     * -------------------------
     */
    const descendantCategories = await Category.find({
      code: { $regex: `^${category.code}` },
    }).lean();

    const descendantIds = descendantCategories.map((c) => c._id);

    const books = await Book.find({
      categories: { $in: descendantIds },
    })
      .populate("categories")
      .lean();

    return Response.json({
      type: "CATEGORY",
      selectedCategory: category,
      subCategories,
      books,
    });
  } catch (err) {
    console.error("❌ Category API Error:", err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
