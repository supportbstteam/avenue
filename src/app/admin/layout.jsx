import { redirect } from "next/navigation";
import { getServerAdmin } from "@/lib/getServerUser";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }) {
  const admin = await getServerAdmin();

  if (!admin) {
    redirect("/auth/admin/login");
  }

  return (
    <div>
      <nav className="p-4 flex justify-between bg-slate-900 text-white">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <LogoutButton />
      </nav>
      <div className="p-6">{children}</div>
    </div>
  );
}


