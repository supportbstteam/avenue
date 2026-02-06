"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const CategorySidebar = () => {
  const router = useRouter();

  const { categories, selectedCategory } = useSelector(
    (state) => state.userCategory
  );

  // only level-1 categories+
  //  const rootCategories = categories.filter(
  //     (c) => c.level === 1
  //   );

  const handleClick = (cat) => {
    router.push(`/category/${cat.code}`);
  };
  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>

      <ul className="space-y-1">
        {categories.length > 0 &&
          categories.map((cat) => {
            const isActive = selectedCategory === cat.code;

            return (
              <li
                key={cat._id}
                onClick={() => handleClick(cat)}
                className={`cursor-pointer rounded px-3 py-2 text-sm transition
                ${
                  isActive
                    ? "bg-orange-500 text-white font-medium"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {cat.displayName}
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
