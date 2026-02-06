"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCMSPages, deleteCMSPage } from "@/store/cmsSlice";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";

export default function CMSAdmin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pages = useSelector((s) => s.cms.list);

  useEffect(() => {
    dispatch(fetchCMSPages());
  }, []);

  const columns = [
    {
      header: "Title",
      accessorFn: (row) => row.title || "Untitled",
    },
    {
      header: "Slug",
      accessorFn: (row) => row.slug,
    },
    {
      header: "Created",
      accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">CMS Pages</h1>

        <button
          onClick={() => router.push("/admin/cms/new")}
          className="bg-teal-700 hover:bg-teal-800 cursor-pointer text-white px-4 py-2 rounded"
        >
          + Create Page
        </button>
      </div>

      <AdminTable
        columns={columns}
        data={pages}
        showView
        showEdit
        showDelete
        onView={(r) => window.open(`/cms/${r.slug}`, "_blank")}
        onEdit={(r) => router.push(`/admin/cms/${r.slug}`)}
        onDelete={(r) => dispatch(deleteCMSPage(r.slug))}
      />
    </div>
  );
}
