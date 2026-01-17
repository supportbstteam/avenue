"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle, BookOpen } from "lucide-react";

export default function AdminPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/books")
      .then(res => setBooks(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 flex items-center gap-4">
          <BookOpen size={40} className="text-blue-600 drop-shadow-sm" />
          Books Management
        </h1>

        <Link href="/admin/add">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md px-5 py-2.5 rounded-lg">
            <PlusCircle size={20} />
            Add New Book
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-10 text-gray-600 text-lg">
          Fetching books, please wait...
        </div>
      )}

      {/* Empty State */}
      {!loading && books.length === 0 && (
        <div className="text-center bg-white shadow-lg rounded-xl p-16 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Books Found
          </h2>
          <p className="text-gray-500 mb-6">Start by adding a new book to the system.</p>
          <Link href="/admin/add">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
              <PlusCircle size={18} />
              Add Your First Book
            </Button>
          </Link>
        </div>
      )}

      {/* Table */}
      {!loading && books.length > 0 && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                <th className="p-4 font-semibold text-blue-900">Title</th>
                <th className="p-4 font-semibold text-blue-900">ISBN</th>
                <th className="p-4 font-semibold text-blue-900">Author</th>
                <th className="p-4 font-semibold text-blue-900">Price</th>
                <th className="p-4 font-semibold text-blue-900 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map(book => (
                <tr 
                  key={book._id}
                  className="border-b hover:bg-blue-50/60 transition"
                >
                  <td className="p-3 text-gray-800 font-medium">{book.title}</td>
                  <td className="p-3 text-gray-600">{book.isbn}</td>
                  <td className="p-3 text-gray-600">{book.author ?? "Unknown Author"}</td>
                  <td className="p-3 text-gray-800 font-semibold">£ {book.price}</td>

                  <td className="p-3">
                    <div className="flex gap-3 justify-center">

                      {/* Edit Button */}
                      <Link href={`/admin/edit/${book._id}`}>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 px-4 border-blue-500 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                        >
                          <Edit size={16} />
                          Edit
                        </Button>
                      </Link>

                      {/* Delete Button */}
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2 px-4 bg-red-600 hover:bg-red-700 shadow text-white"
                        onClick={() =>
                          axios.delete(`/api/books/${book._id}`).then(() => location.reload())
                        }
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
