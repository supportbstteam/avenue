import AdminHeader from "@/components/admin/AdminHeader";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-6">
        <AdminHeader title="Products" />
      </div>
    </div>
  );
};

export default page;
