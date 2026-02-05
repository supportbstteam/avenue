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
    axios
      .get("/api/books")
      .then((res) => setBooks(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"></div>
  );
}
