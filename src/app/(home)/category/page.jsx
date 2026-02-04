"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategories } from "@/store/userCategorySlice";
import ProductCard from "@/components/ProductCard";
import { FaChevronDown,FaChevronRight } from "react-icons/fa";
const Category = () => {
  const dispatch = useDispatch();

  const {
    categories,
    books,
    selectedCategory,
    initialLoading,
    categoryLoading,
    error,
  } = useSelector((state) => state.userCategory);

  // expanded category codes
  const [expanded, setExpanded] = useState(new Set());

  useEffect(() => {
    dispatch(fetchUserCategories({}));
  }, [dispatch]);

  const handleCategoryClick = (cat) => {
    dispatch(fetchUserCategories({ category: cat.code }));
  };

  const toggleExpand = (cat) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(cat.code) ? next.delete(cat.code) : next.add(cat.code);
      return next;
    });

    // fetch children if expanding
    if (!expanded.has(cat.code)) {
      dispatch(fetchUserCategories({ category: cat.code }));
    }
  };

  const getChildren = (parent) =>
    categories.filter(
      (c) =>
        c.level === parent.level + 1 &&
        c.code.startsWith(parent.code)
    );

  const renderCategory = (cat) => {
    const children = getChildren(cat);
    const isExpanded = expanded.has(cat.code);

    return (
      <li key={cat._id} className="ml-2">
        <div
          className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer
            ${
              selectedCategory === cat.code
                ? "bg-orange-500 text-white font-medium"
                : "hover:bg-gray-100 text-gray-800"
            }`}
        >
          <div
            className="flex items-center gap-2 flex-1"
            onClick={() => handleCategoryClick(cat)}
          >
            <span>{cat.headingText}</span>
          </div>

          {children.length > 0 && (
            <button
              onClick={() => toggleExpand(cat)}
              className="text-gray-500 hover:text-gray-800"
            >
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </button>
          )}
        </div>

        {isExpanded && children.length > 0 && (
          <ul className="ml-4 border-l border-gray-200 pl-2 mt-1 space-y-1">
            {children.map((child) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  // ONLY first load shows full loader
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  const rootCategories = categories.filter((c) => c.level === 1);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 p-4 hidden md:block overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>

        <ul className="space-y-1">
          {rootCategories.map((cat) => renderCategory(cat))}
        </ul>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {selectedCategory ? "Books" : "Featured Books"}
          {categoryLoading && (
            <span className="text-sm text-gray-400 animate-pulse">
              updating…
            </span>
          )}
        </h2>

        {books?.length === 0 && (
          <p className="text-gray-500">No books found</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books?.map((book, index) => (
            <ProductCard
              key={book._id}
              product={{
                ...book,
                image: `/img/${(index % 10) + 1}.jpg`,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Category;
