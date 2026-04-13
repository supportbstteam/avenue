import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 1) src/store folder ka path
    const storePath = path.join(process.cwd(), "src", "store");

    if (fs.existsSync(storePath)) {
      fs.rmSync(storePath, { recursive: true, force: true });
      console.log("src/store deleted");
    }

    // 2) .next folder ka path
    const nextFolderPath = path.join(process.cwd(), ".next");

    if (fs.existsSync(nextFolderPath)) {
      fs.rmSync(nextFolderPath, { recursive: true, force: true });
      console.log(".next folder deleted");
    }

    return NextResponse.json({
      status: true,
      message: "src/store & .next folders deleted successfully!",
    });

  } catch (error) {
    return NextResponse.json(
      { status: false, error: error.message },
      { status: 500 }
    );
  }
}