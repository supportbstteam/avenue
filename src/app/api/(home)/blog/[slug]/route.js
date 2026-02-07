import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await connectDB();

  const { slug } = await context.params;

  const blog = await Blog.findOne({
    slug,
    published: true,
  })
    .populate("category", "name slug")
    .select("-__v");

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  // Increment views
  await Blog.updateOne({ _id: blog._id }, { $inc: { views: 1 } });

  return NextResponse.json({ data: blog });
}
