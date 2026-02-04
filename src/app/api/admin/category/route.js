import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST() {
  try {
    console.log("🚀 CATEGORY SYNC STARTED");

    await connectDB();
    console.log("✅ DB CONNECTED");

    // STEP 0: Fetch books with subjects
    const books = await Book.find({
      "descriptiveDetail.subjects.0": { $exists: true },
    }).lean();

    console.log("📚 TOTAL BOOKS FOUND:", books.length);

    if (!books.length) {
      return NextResponse.json(
        { message: "No books with subjects found", books: 0 },
        { status: 200 }
      );
    }

    const categoryMap = new Map();
    const bookCategoryLinks = new Map();

    // STEP 1: Extract subjects
    for (const book of books) {
      const subjects = book.descriptiveDetail?.subjects || [];

      for (const subject of subjects) {
        const scheme = String(subject.scheme).trim();
        const code = String(subject.code).trim();
        const key = `${scheme}|${code}`;

        if (!categoryMap.has(key)) {
          categoryMap.set(key, {
            scheme,
            code,
            headingText: subject.headingText,
            level: code.length, // ✅ IMPORTANT FIX
          });
        }

        if (!bookCategoryLinks.has(book._id.toString())) {
          bookCategoryLinks.set(book._id.toString(), new Set());
        }

        bookCategoryLinks.get(book._id.toString()).add(key);
      }
    }

    console.log("🏷️ UNIQUE CATEGORIES:", categoryMap.size);

    // STEP 2: Upsert categories (LEVEL INCLUDED)
    const categoryOps = [...categoryMap.values()].map((cat) => ({
      updateOne: {
        filter: { scheme: cat.scheme, code: cat.code },
        update: {
          $setOnInsert: {
            scheme: cat.scheme,
            code: cat.code,
            headingText: cat.headingText,
            level: cat.level, // ✅ only here
          },
        },
        upsert: true,
      },
    }));

    if (categoryOps.length) {
      const catResult = await Category.bulkWrite(categoryOps);
      console.log("✅ CATEGORY UPSERT RESULT:", catResult);
    }

    // STEP 3: Fetch category IDs
    const categories = await Category.find({
      $or: [...categoryMap.values()].map((c) => ({
        scheme: c.scheme,
        code: c.code,
      })),
    }).lean();

    console.log("📦 CATEGORIES FETCHED:", categories.length);

    const categoryIdMap = new Map(
      categories.map((c) => [
        `${String(c.scheme).trim()}|${String(c.code).trim()}`,
        c._id,
      ])
    );

    // STEP 4: Link categories to books
    const bookOps = [];

    for (const [bookId, keys] of bookCategoryLinks.entries()) {
      const categoryIds = [...keys]
        .map((k) => categoryIdMap.get(k))
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
      const bookResult = await Book.bulkWrite(bookOps);
      console.log("✅ BOOK BULK WRITE RESULT:", bookResult);
    }

    console.log("🎉 CATEGORY SYNC FINISHED");

    return NextResponse.json(
      {
        message: "Categories synced and linked to books",
        booksUpdated: bookOps.length,
        totalCategories: categories.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 CATEGORY SYNC ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
