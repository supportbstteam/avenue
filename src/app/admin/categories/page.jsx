"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "@/store/categorySlice";

import { Button } from "@/components/ui/button";
import { FolderKanban, FolderPlus, Edit, Trash2 } from "lucide-react";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 flex items-center gap-4">
          <FolderKanban size={40} className="text-purple-600" />
          Category Management
        </h1>

        <Link href="/admin/categories/add">
          <Button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg">
            <FolderPlus size={20} />
            Add Category
          </Button>
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-600 text-lg">
          Loading categories...
        </div>
      )}

      {/* Empty */}
      {!loading && categories.length === 0 && (
        <div className="text-center bg-white shadow-lg p-16 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Categories Found
          </h2>

          <Link href="/admin/categories/add">
            <Button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg">
              <FolderPlus size={18} />
              Add Category
            </Button>
          </Link>
        </div>
      )}

      {/* Table */}
      {!loading && categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-xl border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-purple-50 border-b">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Code</th>
                <th className="p-4 font-semibold">Created At</th>
                <th className="p-4 font-semibold">Updated At</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b hover:bg-purple-50/40">
                  <td className="p-3">{cat.name}</td>
                  <td className="p-3">{cat.code}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(cat.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-3 justify-center">
                      <Link href={`/admin/categories/edit/${cat._id}`}>
                        <Button className="px-4 border-purple-500 text-purple-600" variant="outline">
                          <Edit size={16} /> Edit
                        </Button>
                      </Link>

                      <Button
                        className="px-4 bg-red-600 text-white"
                        onClick={() => dispatch(deleteCategory(cat._id))}
                      >
                        <Trash2 size={16} /> Delete
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
