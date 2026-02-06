
import { connectDB } from "@/lib/db";
import CmsPage from "@/models/CmsPage";
import { NextResponse } from "next/server";

/**
 * =========================================
 * GET SINGLE PAGE (FOR EDITING)
 * =========================================
 */
export async function GET(req, context) {
  await connectDB();

  const { slug } = await context.params;

  const page = await CmsPage.findOne({ slug });

  if (!page) {
    return NextResponse.json(
      { data: null },
      { status: 200 }
    );
  }

  return NextResponse.json({ data: page });
}

/**
 * =========================================
 * DELETE PAGE
 * =========================================
 */
export async function DELETE(req, context) {
  await connectDB();

  const { slug } = await context.params;

  await CmsPage.deleteOne({ slug });

  return NextResponse.json({ success: true });
}
