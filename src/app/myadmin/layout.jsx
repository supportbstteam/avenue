import { redirect } from "next/navigation";
import { getServerAdmin } from "@/lib/getServerUser";
import Sidebar from "@/app/myadmin/include/Sidebar";
import Header from "@/app/myadmin/include/Header";

export default async function AdminLayout({ children }) {
  const admin = await getServerAdmin();

  if (!admin) {
    redirect("/auth/myadmin/login");
  }

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">

        <Header />

        <main className="">
          {children}
        </main>

      </div>
    </div>
  );
}


