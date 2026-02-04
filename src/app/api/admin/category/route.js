import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { Category } from "@/models/Category";

export async function POST() {
  try {
    console.log("🚀 CATEGORY SYNC STARTED");
    await connectDB();
    console.log("✅ DB CONNECTED");

    /**
     * ==================================================
     * STEP 1: FETCH BOOKS WITH SUBJECTS
     * ==================================================
     */
    const books = await Book.find({
      "descriptiveDetail.subjects.0": { $exists: true },
    }).lean();

    console.log("📚 TOTAL BOOKS FOUND:", books.length);

    if (!books.length) {
      return NextResponse.json(
        { message: "No books with subjects found" },
        { status: 200 }
      );
    }

    /**
     * ==================================================
     * STEP 2: BUILD CATEGORY MAP
     * key = code
     * value = { code, level, schemes[] }
     * ==================================================
     */
    const categoryMap = new Map();        // code → category
    const bookCategoryLinks = new Map();  // bookId → Set(code)

    for (const book of books) {
      const subjects = book.descriptiveDetail?.subjects || [];
      const bookId = book._id.toString();

      for (const subject of subjects) {
        const code = String(subject.code || "").trim();
        const scheme = String(subject.scheme || "").trim();
        const headingText = String(subject.headingText || "").trim();

        if (!code) continue;

        // Create base category
        if (!categoryMap.has(code)) {
          categoryMap.set(code, {
            code,
            level: code.length,
            schemes: [],
          });
        }

        // Merge scheme (no duplicates)
        if (scheme) {
          const cat = categoryMap.get(code);
          const exists = cat.schemes.some(
            (s) => s.scheme === scheme
          );

          if (!exists) {
            cat.schemes.push({ scheme, headingText });
          }
        }

        // Track book → category code
        if (!bookCategoryLinks.has(bookId)) {
          bookCategoryLinks.set(bookId, new Set());
        }
        bookCategoryLinks.get(bookId).add(code);
      }
    }

    console.log("🏷️ UNIQUE CATEGORY CODES:", categoryMap.size);

    /**
     * ==================================================
     * STEP 3: UPSERT BASE CATEGORIES (NO SCHEMES)
     * ==================================================
     */
    const baseCategoryOps = [...categoryMap.values()].map((cat) => ({
      updateOne: {
        filter: { code: cat.code },
        update: {
          $setOnInsert: {
            code: cat.code,
            level: cat.level,
            schemes: [], // 🔑 must exist before pushing
          },
        },
        upsert: true,
      },
    }));

    if (baseCategoryOps.length) {
      const res = await Category.bulkWrite(baseCategoryOps);
      console.log("✅ BASE CATEGORY UPSERT:", res);
    }

    /**
     * ==================================================
     * STEP 4: MERGE SCHEMES (SAFE ARRAY UPDATES)
     * ==================================================
     */
    const schemeOps = [];

    for (const cat of categoryMap.values()) {
      for (const schemeObj of cat.schemes) {
        schemeOps.push({
          updateOne: {
            filter: {
              code: cat.code,
              "schemes.scheme": { $ne: schemeObj.scheme },
            },
            update: {
              $push: { schemes: schemeObj },
            },
          },
        });
      }
    }

    if (schemeOps.length) {
      const res = await Category.bulkWrite(schemeOps);
      console.log("✅ SCHEMES MERGED:", res);
    }

    /**
     * ==================================================
     * STEP 5: FETCH CATEGORY IDS
     * ==================================================
     */
    const categories = await Category.find({
      code: { $in: [...categoryMap.keys()] },
    }).lean();

    const categoryIdByCode = new Map(
      categories.map((c) => [c.code, c._id])
    );

    /**
     * ==================================================
     * STEP 6: LINK CATEGORIES TO BOOKS
     * ==================================================
     */
    const bookOps = [];

    for (const [bookId, codes] of bookCategoryLinks.entries()) {
      const categoryIds = [...codes]
        .map((code) => categoryIdByCode.get(code))
        .filter(Boolean);

      if (!categoryIds.length) continue;

      bookOps.push({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(bookId) },
          update: {
            $addToSet: {
              categories: { $each: categoryIds },
            },
          },
        },
      });
    }

    console.log("🛠️ BOOK UPDATE OPS:", bookOps.length);

    if (bookOps.length) {
      const res = await Book.bulkWrite(bookOps);
      console.log("✅ BOOK CATEGORY LINKED:", res);
    }

    /**
     * ==================================================
     * DONE
     * ==================================================
     */
    console.log("🎉 CATEGORY SYNC FINISHED");

    return NextResponse.json(
      {
        message: "Categories synced and linked successfully",
        totalCategories: categories.length,
        booksUpdated: bookOps.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 CATEGORY SYNC ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
