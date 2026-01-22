import { NextResponse } from "next/server";
import Book from "@/models/oldBook";
import { connectDB } from "@/lib/db";

export async function GET(_, { params }) {
    await connectDB();

    const books = [];

    const { id } = await params;

    const book = await Book.findById(id);

    books.push(book);

    return NextResponse.json(books);
}
