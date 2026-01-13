"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function BookForm({ book, onSubmitSuccess }) {
  const { register, handleSubmit } = useForm({
    defaultValues: book || {}
  });

  const onSubmit = async (data) => {
    if (book?._id) {
      await axios.put(`/api/books/${book._id}`, data);
    } else {
      await axios.post("/api/books", data);
    }
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <Input placeholder="Title" {...register("title")} required />
      <Input placeholder="ISBN" {...register("isbn")} required />
      <Input placeholder="Author" {...register("contributor")} required />
      <Input placeholder="Price" type="number" {...register("price")} required />

      <textarea
        className="w-full border p-2"
        placeholder="Description"
        {...register("description")}
      ></textarea>

      <Button type="submit">{book ? "Update Book" : "Add Book"}</Button>
    </form>
  );
}
