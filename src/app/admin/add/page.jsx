"use client";
import BookForm from "@/components/BookForm";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Add New Book</h1>

      <BookForm onSubmitSuccess={() => router.push("/admin")} />
    </div>
  );
}
