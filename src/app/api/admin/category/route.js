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

    // STEP 0: Fetch books
    const books = await Book.find({
      "descriptiveDetail.subjects.0": { $exists: true },
    }).lean();

    console.log("📚 TOTAL BOOKS FOUND:", books.length);

    if (!books.length) {
      console.log("⚠️ NO BOOKS WITH SUBJECTS");
      return NextResponse.json(
        { message: "No books with subjects found", books: 0 },
        { status: 200 }
      );
    }

    const categoryMap = new Map();
    const bookCategoryLinks = new Map();

    // STEP 1: Extract subjects
    for (const book of books.slice(0, 3)) {
      console.log("📘 BOOK ID:", book._id.toString());
      console.log(
        "🧩 SUBJECTS:",
        book.descriptiveDetail?.subjects
      );
    }

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
          });
        }

        if (!bookCategoryLinks.has(book._id.toString())) {
          bookCategoryLinks.set(book._id.toString(), new Set());
        }

        bookCategoryLinks.get(book._id.toString()).add(key);
      }
    }

    console.log("🏷️ UNIQUE CATEGORY KEYS:", [...categoryMap.keys()].slice(0, 10));
    console.log("📊 TOTAL UNIQUE CATEGORIES:", categoryMap.size);
    console.log("📊 BOOK → CATEGORY MAP SIZE:", bookCategoryLinks.size);

    // STEP 2: Upsert categories
    const categoryOps = [...categoryMap.values()].map((cat) => ({
      updateOne: {
        filter: { scheme: cat.scheme, code: cat.code },
        update: { $setOnInsert: cat },
        upsert: true,
      },
    }));

    console.log("⬆️ CATEGORY UPSERT OPS:", categoryOps.length);

    if (categoryOps.length) {
      const catResult = await Category.bulkWrite(categoryOps);
      console.log("✅ CATEGORY UPSERT RESULT:", catResult);
    }

    // STEP 3: Fetch categories
    const categories = await Category.find({
      $or: [...categoryMap.values()].map((c) => ({
        scheme: c.scheme,
        code: c.code,
      })),
    }).lean();

    console.log("📦 CATEGORIES FETCHED FROM DB:", categories.length);
    console.log(
      "📦 SAMPLE CATEGORY:",
      categories[0]
    );

    const categoryIdMap = new Map(
      categories.map((c) => [
        `${String(c.scheme).trim()}|${String(c.code).trim()}`,
        c._id,
      ])
    );

    console.log(
      "🗺️ CATEGORY ID MAP SAMPLE:",
      [...categoryIdMap.entries()].slice(0, 5)
    );

    // STEP 4: Prepare book updates
    const bookOps = [];

    for (const [bookId, keys] of bookCategoryLinks.entries()) {
      const categoryIds = [...keys]
        .map((k) => categoryIdMap.get(k))
        .filter(Boolean);

      if (!categoryIds.length) {
        console.log(
          "❌ NO CATEGORY IDS FOR BOOK:",
          bookId,
          "KEYS:",
          [...keys]
        );
        continue;
      }

      console.log(
        "✅ BOOK",
        bookId,
        "CATEGORY IDS:",
        categoryIds
      );

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
      const result = await Book.bulkWrite(bookOps);
      console.log("✅ BOOK BULK WRITE RESULT:", result);
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

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
