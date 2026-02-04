"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  /**
   * --------------------------------------------------
   * Inject ACTION column dynamically
   * --------------------------------------------------
   */
  const enhancedColumns = [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const record = row.original;

        return (
          <div className="flex gap-3 items-center">
            <button
              onClick={() => onEdit?.(record)}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
              title="Edit"
            >
              <FaEdit size={20} />
            </button>

            <button
              onClick={() => onDelete?.(record)}
              className="text-red-600 cursor-pointer hover:text-red-800"
              title="Delete"
            >
              <FaTrash size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,                    // 🔑 backend-controlled (50 rows)
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // 🔥 IMPORTANT
    manualPagination: true,  // backend pagination
  });

  return (
    <div className="w-full overflow-x-auto bg-white rounded border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#ae0001] border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-semibold text-white cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted()] ?? ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 transition"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
