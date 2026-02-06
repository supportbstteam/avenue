import { connectDB } from "@/lib/db";
import CmsPage from "@/models/CmsPage";
import { NextResponse } from "next/server";

/**
 * =========================
 * GET ALL CMS PAGES
 * =========================
 */
export async function GET() {
  try {
    await connectDB();

    const pages = await CmsPage.find({}, "title slug level createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ data: pages });
  } catch (err) {
    console.error("CMS GET Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

/**
 * =========================
 * CREATE / UPDATE PAGE
 * =========================
 */
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { title = "", slug, level = 0, blocks = [] } = body;


    console.log("Level:",level,", Title: ", title);

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    /**
     * Normalize slug
     */
    const cleanSlug = slug.toLowerCase().trim();

    /**
     * Upsert page
     */
    const page = await CmsPage.findOneAndUpdate(
      { slug: cleanSlug },
      {
        title,
        slug: cleanSlug,
        level,
        blocks,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json({ data: page });
  } catch (err) {
    console.error("CMS POST Error:", err);

    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}
