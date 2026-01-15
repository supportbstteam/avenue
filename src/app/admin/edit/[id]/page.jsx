"use client";

import { useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "@/components/BookForm";
import { useRouter } from "next/navigation";
import { fetchBook } from "@/store/bookSlice";

export default function EditBookPage({ params }) {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.book);
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  if (book.loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <BookForm book={book} onSubmitSuccess={() => router.push("/admin")} />
    </div>
  );
}
