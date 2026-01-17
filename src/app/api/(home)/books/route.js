import { NextResponse } from "next/server";
import Book from "@/models/Book";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";


export async function GET(req) {
  await connectDB();

  const { search, category, sort, limit = 20, page = 1 } =
    Object.fromEntries(req.nextUrl.searchParams);

  const filter = {};

  /* ---------------- SEARCH ---------------- */
  if (search && search.trim()) {
    const searchConditions = [];

    // ✅ Exact match on _id (only if valid ObjectId)
    if (mongoose.Types.ObjectId.isValid(search)) {
      searchConditions.push({
        _id: new mongoose.Types.ObjectId(search),
      });
    }

    // ✅ Exact match on ISBN
    searchConditions.push({ isbn: search });

    // ✅ Partial match on title
    searchConditions.push({
      title: { $regex: search, $options: "i" },
    });

    // ✅ Partial match on author
    searchConditions.push({
      author: { $regex: search, $options: "i" },
    });

    filter.$or = searchConditions;
  }

  /* ---------------- CATEGORY FILTER ---------------- */
  // if (category) {
  //   filter.category = category;
  // }

  /* ---------------- QUERY ---------------- */
  let query = Book.find(filter);

  /* ---------------- SORTING ---------------- */
  if (sort === "latest") query = query.sort({ createdAt: -1 });
  if (sort === "oldest") query = query.sort({ createdAt: 1 });
  if (sort === "price_low") query = query.sort({ price: 1 });
  if (sort === "price_high") query = query.sort({ price: -1 });

  /* ---------------- PAGINATION ---------------- */
  const skip = (Number(page) - 1) * Number(limit);

  const books = await query
    .limit(Number(limit))
    .skip(skip);
  return NextResponse.json(books);
}
