import { connectDB } from "@/lib/db";
import CmsPage from "@/models/CmsPage";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const pages = await CmsPage.find({}, "title slug")
    .sort({ createdAt: -1 });

  return NextResponse.json(pages);
}
