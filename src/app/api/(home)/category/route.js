import Book from "@/models/Book";
import { Category } from "@/models/Category";

export async function GET() {
  try {
    const books = await Book.find({
      category: "category",
    });
    return new Response(JSON.stringify(books));
  } catch (err) {
    console.log("Error in Category API route:", err);
  }
}
