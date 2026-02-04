"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { fetchCategoryById } from "@/store/categorySlice";

const CategoryDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const scheme = searchParams.get("scheme");

  const { selectedCategory, selectedLoading, selectedError } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (id && scheme) {
      dispatch(fetchCategoryById({ id, scheme }));
    }
  }, [id, scheme, dispatch]);

  if (selectedLoading) {
    return <div className="p-6 text-gray-500">Loading category…</div>;
  }

  if (selectedError) {
    return <div className="p-6 text-red-500">{selectedError}</div>;
  }

  const row = selectedCategory[0];

  if (!row) {
    return <div className="p-6">No data found</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Category: {row.code}</h1>

      <div className="bg-white border rounded p-4 space-y-2">
        <p>
          <strong>Scheme:</strong> {row.scheme}
        </p>
        <p>
          <strong>Heading:</strong> {row.headingText}
        </p>
        <p>
          <strong>Level:</strong> {row.level}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={row.status ? "text-green-600" : "text-red-600"}>
            {row.status ? "Active" : "Inactive"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
