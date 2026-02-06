"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchUserCategories } from "@/store/userCategorySlice";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";

const SubCategory = () => {
  const dispatch = useDispatch();
  const { code } = useParams(); // category code from URL

  const {
    categories,
    books,
    initialLoading,
    categoryLoading,
    error,
    selectedCategory,
    page, 
    totalPages
  } = useSelector((state) => state.userCategory);

  /**
   * ------------------------------------------------------
   * Load ROOT categories once
   * ------------------------------------------------------
   */
  // useEffect(() => {
  //   if (categories.length === 0) {
  //     dispatch(fetchUserCategories()); // no category param = root
  //   }
  // }, [categories.length, dispatch]);

  /**
   * ------------------------------------------------------
   * Load books when category code changes
   * ------------------------------------------------------
   */
  useEffect(() => {
    if (code && selectedCategory !== code) {
      dispatch(fetchUserCategories({ category: code, page: 1 }));
    }
  }, [code, selectedCategory, dispatch]);

  /**
   * ------------------------------------------------------
   * Loading / Error states
   * ------------------------------------------------------
   */
  if (initialLoading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CategorySidebar />

      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Books
          {categoryLoading && (
            <span className="text-sm text-gray-400 animate-pulse">
              updating…
            </span>
          )}
        </h2>

        {!categoryLoading && books.length === 0 && (
          <p className="text-gray-500">No books found</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book, index) => (
            <ProductCard
              key={book._id}
              product={{
                ...book,
                image: `/img/${(index % 10) + 1}.jpg`,
              }}
            />
          ))}
        </div>


                <div className="flex justify-center mt-6 gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => dispatch(fetchUserCategories({category: code, page: page - 1 }))}
                    className="px-3 py-1 bg-[#FF6A00] text-[#fff] rounded disabled:opacity-40"
                  >
                    Prev
                  </button>
        
                  <span className="px-3 py-1">
                    Page {page} / {totalPages}
                  </span>
        
                  <button
                    disabled={page === totalPages}
                    onClick={() => dispatch(fetchUserCategories({category: code, page: page + 1 }))}
                    className="px-3 py-1 bg-[#FF6A00] text-[#fff] rounded disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
      </main>
    </div>
  );
};

export default SubCategory;
