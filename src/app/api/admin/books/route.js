import { connectDB } from "@/lib/db";
import Book from "@/models/oldBook";

export async function GET() {
  await connectDB();
  const books = await Book.find().limit(10);
  return Response.json(books);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const book = await Book.create(data);
  return Response.json(book);
}
