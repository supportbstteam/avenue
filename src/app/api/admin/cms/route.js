import { connectDB } from "@/lib/db";
import CmsPage from "@/models/CmsPage";
import { NextResponse } from "next/server";
/**
 * =========================
 * GET ALL CMS PAGES
 * =========================
 */
export async function GET() {
  await connectDB();

  const pages = await CmsPage.find({}, "title slug createdAt").sort({
    createdAt: -1,
  });

  return NextResponse.json({ data: pages });
}

/**
 * =========================
 * CREATE / UPDATE PAGE
 * =========================
 */
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const { title = "", slug, blocks = [] } = body;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  console.log("Title in the POST CMS Create",title)

  const page = await CmsPage.findOneAndUpdate(
    { slug: slug.toLowerCase().trim() },
    {
      title,
      slug: slug.toLowerCase().trim(),
      blocks,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  return NextResponse.json({ data: page });
}
