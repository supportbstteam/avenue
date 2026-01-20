import { NextResponse } from "next/server";
import Book from "@/models/Book";
import { connectDB } from "@/lib/db";

export async function GET(_, { params }) {
    await connectDB();

    const { id } = await params;

    const books = await Book.findById(id);
    console.log(books);
    return NextResponse.json(books);
}
