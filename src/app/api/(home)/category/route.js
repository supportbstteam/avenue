import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

/**
 * Escape regex safely
 */
function escapeRegex(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Normalize category for frontend
 * ✅ respects scheme-level status
 * ✅ NEVER returns undefined displayName
 */
function normalizeCategory(category) {
  const activeSchemes =
    category.schemes?.filter((s) => s.status !== false) || [];

  if (!activeSchemes.length) return null; // 🔥 IMPORTANT

  const displayName =
    activeSchemes
      .slice()
      .sort((a, b) =>
        (a.headingText || "").localeCompare(b.headingText || "")
      )[0]?.headingText || category.code;

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
    const page = searchParams.get("page");
    const perPage = 20;
    const skip = (page - 1) * perPage;


     console.log(page);

    

    /**
     * ==================================================
     * ROOT
     * ==================================================
     */
    if (!categoryParam) {
      const rawCategories = await Category.find({
        level: 1,
        "schemes.status": true, // ✅ only active
      })
        .sort({ code: 1 })
        .lean();

      const categories = rawCategories
        .map(normalizeCategory)
        .filter(Boolean); // 🔥 IMPORTANT

      // const books = await Book.find({
      //   categories: { $exists: true, $ne: [] },
      // })
      //   .limit(20)
      //   .lean();

      const books = await Book.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 200 },      // top 200 latest only
        { $skip: skip },
        { $limit: perPage },
      ]);

      return Response.json({
        type: "ROOT",
        categories,
        books,
        page: Number(page),
        perPage,
        total: 200,
        totalPages: Math.ceil(200 / perPage),
      });
    }

    /**
     * ==================================================
     * CATEGORY CLICKED (code or id)
     * ==================================================
     */
    let category;

    if (mongoose.Types.ObjectId.isValid(categoryParam)) {
      category = await Category.findOne({
        _id: categoryParam,
        "schemes.status": true,
      }).lean();
    } else {
      category = await Category.findOne({
        code: categoryParam.trim(),
        "schemes.status": true,
      }).lean();
    }

    if (!category) {
      return Response.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const selectedCategory = normalizeCategory(category);
    if (!selectedCategory) {
      return Response.json(
        { message: "Category has no active schemes" },
        { status: 404 }
      );
    }

    const safeCode = escapeRegex(category.code);

    /**
     * --------------------------------------------------
     * IMMEDIATE SUBCATEGORIES
     * --------------------------------------------------
     */
    const rawSubCategories = await Category.find({
      code: { $regex: `^${safeCode}` },
      level: category.level + 1,
      "schemes.status": true,
    })
      .sort({ code: 1 })
      .lean();

    const subCategories = rawSubCategories
      .map(normalizeCategory)
      .filter(Boolean);

    /**
     * --------------------------------------------------
     * DESCENDANTS (FOR BOOKS)
     * --------------------------------------------------
     */
    const descendantCategories = await Category.find({
      code: { $regex: `^${safeCode}` },
      "schemes.status": true,
    }).lean();

    const descendantIds = descendantCategories.map((c) => c._id);

    const books = await Book.find({
      categories: { $in: descendantIds },
    })
      .sort({ createdAt: -1 })     // latest first (optional but recommended)
      .skip(skip)
      .limit(perPage)
      .lean();


    // const books = await Book.find({
    //   categories: { $in: descendantIds },
    // }).limit(20).lean();


    return Response.json({
      type: "CATEGORY",
      selectedCategory,
      subCategories,
      books,
      page: Number(page),
      perPage,
      total: 200,
      totalPages: Math.ceil(200 / perPage),
    });
  } catch (err) {
    console.error("❌ Category API Error:", err);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
