"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/books").then(res => setBooks(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Books Admin Panel</h1>

      <Link href="/admin/add">
        <Button>Add New Book</Button>
      </Link>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="border">
            <th className="p-2">Title</th>
            <th className="p-2">ISBN</th>
            <th className="p-2">Author</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book._id} className="border">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.isbn}</td>
              <td className="p-2">{book.contributor ?? "Unknown Author"}</td>
              <td className="p-2">£ {book.price}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/admin/edit/${book._id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() =>
                    axios.delete(`/api/books/${book._id}`).then(() => location.reload())
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
