"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function SearchResultsPage() {
  const { searchResults, loading, searchText } = useSelector((state) => state.book);

  useEffect(() => {
    console.log("sraech",searchResults);
  }, [searchResults]);
    
  if (loading) return <p>Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Search results for "{searchText}"
      </h2>

      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchResults.map((item) => (
            <div key={item._id} className="border p-3 rounded">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
