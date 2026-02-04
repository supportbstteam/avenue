import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

/**
 * Escape regex special characters
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Normalize category for frontend
 * Keeps response shape EXACTLY the same
 */
function normalizeCategory(category) {
  const schemes = category.schemes || [];

  // deterministic label selection
  const displayName =
    schemes.length > 0
      ? schemes
          .slice()
          .sort((a, b) =>
            (a.headingText || "").localeCompare(
              b.headingText || ""
            )
          )[0].headingText
      : category.code;

  return {
    _id: category._id,
    code: category.code,
    level: category.level,
    displayName,
  };
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category");

    /**
     * ==================================================
     * CASE 1: ROOT
     * ==================================================
     */
    if (!categoryParam) {
      const rawCategories = await Category.find({ level: 1 })
        .sort({ code: 1 })
        .lean();

      const categories = rawCategories.map(normalizeCategory);

      const books = await Book.find({
        categories: { $exists: true, $ne: [] },
      })
        .limit(20)
        .lean();

      return Response.json({
        type: "ROOT",
        categories,
        books,
      });
    }

    /**
     * ==================================================
     * CASE 2: CATEGORY CLICKED (code or id)
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

    const selectedCategory = normalizeCategory(category);
    const safeCode = escapeRegex(category.code);

    /**
     * --------------------------------------------------
     * IMMEDIATE SUBCATEGORIES
     * --------------------------------------------------
     */
    const rawSubCategories = await Category.find({
      code: { $regex: `^${safeCode}` },
      level: category.level + 1,
    })
      .sort({ code: 1 })
      .lean();

    const subCategories = rawSubCategories.map(normalizeCategory);

    /**
     * --------------------------------------------------
     * DESCENDANTS (for books)
     * --------------------------------------------------
     */
    const descendantCategories = await Category.find({
      code: { $regex: `^${safeCode}` },
    }).lean();

    const descendantIds = descendantCategories.map((c) => c._id);

    const books = await Book.find({
      categories: { $in: descendantIds },
    }).lean();

    return Response.json({
      type: "CATEGORY",
      selectedCategory,
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
