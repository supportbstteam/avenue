"use client";
import axios from "axios";
import { useEffect, useState, use } from "react";
import BookForm from "@/components/BookForm";
import { useRouter } from "next/navigation";

export default function EditBookPage({ params }) {
  const { id } = use(params);
  const [book, setBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBook() {
      const res = await axios.get(`/api/books/${id}`);
      setBook(res.data);
    }

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit Book</h1>

      <BookForm book={book} onSubmitSuccess={() => router.push("/admin")} />
    </div>
  );
}
